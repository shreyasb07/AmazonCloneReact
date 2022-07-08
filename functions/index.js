const functions = require("firebase-functions");

const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51LIIQSCohUGRSJidvpD1phL0Tzzby54O6UICS8uqf7iK0rWrbci53SeRBkSaY7zi7cx0s1qne0wP69hUuzzsZPXY00fmkDdnIE");


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


// firebase emulators:start


//  API

// *************
//  App Config
// *************
const app = express();
app.use(cors({origin: true}));
app.use(express.json());

//  API Routes
// app.get("/", (request, response) =>{
//   response.status(200).send("Hello World");
// });

app.post("/payments/create", async (request, response) => {
  const total = request.query.total;
  console.log("Payment request received $B", total);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "usd",
  });
    // Ok- But created something
  response.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});

// *************
//  Listen Command
// *************
//  working with Firebase cloud functions
//  for local development use command 'firebase emulators:start'

//  Example endpoint
// http://localhost:5001/clone-7c211/us-central1/api
exports.api = functions.https.onRequest(app);
// app.listen()
