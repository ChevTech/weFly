'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var MongoClient = require('promised-mongo');
var MONGO_CONN_URL = 'mongodb://localhost:27017/skyscanner';
var db = MongoClient(MONGO_CONN_URL, ['skyscanner']);

function insertItinerary(documents) {
	return db.skyscanner.insert(documents);
};

function getItinerary(searchCriteria) {
	return db.skyscanner.find(searchCriteria).toArray();
};

exports.insertItinerary = insertItinerary;
exports.getItinerary = getItinerary;