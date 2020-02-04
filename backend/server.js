const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const URL = 'mongodb+srv://Christian:christian001@cluster-qxk0k.gcp.mongodb.net/Library?retryWrites=true&w=majority';

const server = express();

//Connect to MongoDB Atlas
mongoose.connect(URL);

//Open Connection with MongoDB Atlas
mongoose.connection.once('open', () =>{
    console.log('Connected to MongoDB Atlas');
});

server.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

server.listen(4000, () => {
    console.log('Listening in port 4000');
});