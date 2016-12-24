const MongoClient = require('promised-mongo');
const MONGO_CONN_URL = 'mongodb://localhost:27017/skyscanner';
const db = MongoClient(MONGO_CONN_URL, ['skyscanner']);

function insertItinerary(documents){
	return db.skyscanner.insert(documents);
};

function getItinerary(searchCriteria){
	return db.skyscanner.find(searchCriteria).toArray();
};

export {insertItinerary, getItinerary};