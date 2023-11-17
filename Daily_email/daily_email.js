
//importing, requiring and setting all hardcoded values
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer")
const {google} = require("googleapis")
const cron = require('node-cron');

//const JSONStream = require('JSONStream');

const CLIENT_ID = "226419603487-b7cp7tgrffkiqbv1i288m2sge8666qt9.apps.googleusercontent.com"
const CLIENT_SECRET= "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"
const REDIRECT_URI = "https://developers.google.com/oauthplayground"
const REFRESH_TOKEN = "1//04qCvBiwAfldfCgYIARAAGAQSNwF-L9IrKtvJQjDZvng1C6sNtbcPymTBsOSxxk6-dZ1DShLMsugd27M4MU2-va9OoC4r5WN3t6Y"

////////////////////////////////////////////////////////////////

//passing the credentials to the gmail api to fetch the refresh token
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//establishing a connection to the mongoDB database


mongoose.connect("mongodb+srv://srivastavasnigdha519:mjQnzizxDENnZQ8G@readone.ewtbxdf.mongodb.net/ReadwiseDB?retryWrites=true&w=majority", {
  useNewUrlParser: true
});


// mongoose.connect("mongodb://localhost:27017/ReadwiseDB", {
//   useNewUrlParser: true
// });
//

//defining schemas
const userSchema = {
  email: String,
  emailId: String,
  password: String
}

const noteSchema = {
  user: String,
  index: Number,
  book: String,
  content: String,
  tag: String
};

const dailyQuoteSchema = {
  user: String,
  date: String,
  book: String,
  content: String,
  tag: String
};

const Quote = mongoose.model("Quote", dailyQuoteSchema); //singular version of the collection
const Note = mongoose.model("Note", noteSchema); //singular version of the collection
const User = mongoose.model("User", userSchema); //singular version of the collection

app.use(bodyParser.urlencoded({
  extended: true
}));


app.get('/', (req, res) => {
const scheduledTask = () => {

  let found_note = new Note();
  let userList;


  User.distinct("email", function(err,allUsers){ //array of all distict users

    userList = allUsers;


  console.log("This is the list of users");
  console.log(userList);

  //iterate through the array of distinct users
  for(let i = 0; i< userList.length; i++){

    userName = allUsers[i];

  User.find({email: userName},{emailId: 1}, function(err, mailId){ //find the mailID of the user

  //find 1 random document of that user
    Note.aggregate([{$match: {user:allUsers[i]}},{$sample: {size: 1}}], function(err, foundNote)
       {
         if(!err) {
         let currentDate = new Date().toJSON().slice(0, 10);
         console.log(currentDate); // "2022-06-17"
         console.log(userName);
         console.log(foundNote[0].book);
          //saving today's quote
         const newQuote = new Quote({
           user: foundNote[0].user,
           date: currentDate,
           book: foundNote[0].book,
           content: foundNote[0].content,
           tag: foundNote[0].tag
         });

         newQuote.save(function(err){

           if(err){
             console.log("error in saving dailyQuote")
           }

          });
        if (!err)
        {
          //where home render was here
          //sending a mail through API

          async function sendMail()
          {
            try
            {
                const accessToken = await oAuth2Client.getAccessToken();

                const transport = nodemailer.createTransport(
                {
                    service: 'gmail',
                    auth:
                    {
                        type: 'OAuth2',
                        user: 'srivastava.snigdha519@gmail.com',
                        clientId: CLIENT_ID,
                        clientSecret: CLIENT_SECRET,
                        refreshToken: REFRESH_TOKEN,
                        accessToken: accessToken,
                    },
                });

                const mailOptions =
                {
                  from: 'Readwise <srivastava.snigdha519@gmail.com>',
                  to: mailId,
                  subject: 'Quote of the day!',
                  text: 'Hello from the other side',
                  html: '<div style="background-color: #95D1CC;text-align: center;padding: 1em; border-radius: 25% 10%; font: Roboto;">'+'<h2>'+foundNote[0].book+'</h2><h3 style="font-style: italic;">'+foundNote[0].content+'</h3></div>'
                }

                const result = await transport.sendMail(mailOptions);
                console.log("reached till send mail");
                return result;
            } catch (error)
            {
              return error;
            }
          } //sendMail()

          sendMail()
          .then((result) => console.log('Email sent...', result))
          .catch((error) => console.log(error.message));

        } //if(!err)
      }
    });

    });
  }
  });
}

cron.schedule('24 11 * * *', scheduledTask);
});

app.listen(4000, () => {
  console.log(`Server is running on port 8000.`);
});
