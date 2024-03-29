
//importing, requiring and setting all hardcoded values
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer")
const {google} = require("googleapis")
require('dotenv').config();

//const JSONStream = require('JSONStream');

const CLIENT_ID = process.env.CLIENT_ID;     
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

////////////////////////////////////////////////////////////////

//passing the credentials to the gmail api to fetch the refresh token
const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

//establishing a connection to the mongoDB database
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true
  });
  

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


async function UsersList(){
    try{
        allUsers = await User.distinct("email") //array of all distict users
        return allUsers;
    }
    catch(err){
        console.log(err);
    }
   
}


async function getUser(userName){
    try{
        const mailId = await User.find({email: userName},{emailId: 1}) //find the mailID of the user
        return mailId;
    }
    catch(err){
        console.log(err);
    }
  
}

       
function saveQuote(foundNote,userName){   
        let currentDate = new Date().toJSON().slice(0, 10); // "2022-06-17"

        //saving today's quote
        const newQuote = new Quote({
            user: foundNote[0].user,
            date: currentDate,
            book: foundNote[0].book,
            content: foundNote[0].content,
            tag: foundNote[0].tag
        });

        newQuote.save();
   }
           
       

async function sendMail(mailId,foundNote)
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
              console.log(error);
              return error;
            }
          } //sendMail()
          
app.get('/run', async (req, res) => 
{


            //getting list of users
            const userList = await UsersList();
            console.log(userList);


            //iterating through each user 
            for(let i = 0; i<userList.length; i++)
            {

              let userName = userList[i];
              console.log("userName"+userName);
              let userEmail = await getUser(userName);
        
              //finding one random document
              let foundNote = await Note.aggregate([{$match: {user:userName}},{$sample: {size: 1}}])
              console.log("NOTE FOUND"+ foundNote);


              //saving today's quote in a new collection for home to render
              saveQuote(foundNote,userName);
        
              //send mail to that user
              sendMail(userEmail,foundNote) //returns a promise
              .then((result) => console.log('Email sent...', result)) //consuming function
              .catch((error) => console.log(error.message));
            
            }
            res.status(200).json({message: "mail sent"});
        
        
       
});
   
app.listen(4000, () => {
  console.log(`Server is running on port 8000.`);
});
