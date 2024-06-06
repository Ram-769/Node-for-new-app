const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true

    },

    name: {
        type: String,
        required: true,
        unique:true
    },
    host: {
        type: String,
        required: true
    }
});

const categorySchema = new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true,
        

    },
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true,
        unique:true
    }

});

const apiSchema = new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    name: {
        type: String,
        required: true,


    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    payload: {
        type: String,
        required: true
    },
    payloadhelpdefinition: {
        type: String,
        required: true
    },
    response: {
        type: String,
        required: true
    },
    responsehelpdefinition: {
        type: String,
        required: true
    },


});
const loginData = new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true   
    }
});
const users = new mongoose.Schema({
    "_id": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        auto: true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true   
    },
    phoneNo: {
        type: String,
        required: false   
    }

});


module.exports = [
    { "coll": 'project', "schema": projectSchema, "db": "restdb" },
    { "coll": 'category', "schema": categorySchema, "db": "restdb" },
    { "coll": 'apilist', "schema": apiSchema, "db": "restdb" },
    // { "coll": 'userdata', "schema": loginData, "db": "gitdb" },
    { "coll": 'userdata', "schema": loginData, "db": "serverdb" }
    

];