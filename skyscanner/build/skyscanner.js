'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
//import { insertItinerary, getItinerary } from './database';
var request = require('request');
var denodeify = require('es6-denodeify')(Promise);
var post = denodeify(request.post);
var get = denodeify(request.get);
var open = require('open');

var outbounddepartstarttime = '20:00';
var outbounddepartendtime = '24:00';
var inbounddepartstarttime = '16:00';
var inbounddepartendtime = '21:00';

var apiKey = 'an491667891952729577555613864243';
var SKY_BASE_API = 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0/';
var SKY_live_pricing_API = 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0/?apiKey=' + apiKey;
var SKY_currencies_API = 'http://partners.api.skyscanner.net/apiservices/reference/v1.0/currencies?apiKey=' + apiKey;
var SKY_locales_API = 'http://partners.api.skyscanner.net/apiservices/reference/v1.0/locales?apiKey=' + apiKey;
var SKY_countries_API = 'http://partners.api.skyscanner.net/apiservices/reference/v1.0/countries/{locale}?apiKey=' + apiKey;

var headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'Accept-Language: en-US,en;q=0.8'
};

function createSession(argv) {
    var requestBody = {
        'country': argv.c,
        'currency': argv.cur,
        'locale': argv.loc,
        'locationSchema:': 'iata',
        'originplace': argv.originplace,
        'destinationplace': argv.destinationplace,
        'outbounddate': '' + argv.outbounddate,
        'inbounddate': '' + argv.inbounddate,
        'adults': argv.adults,
        'groupPricing': argv.group
    };

    var outbounddate = '' + argv.outbounddate;
    var inbounddate = '' + argv.inbounddate;

    var live_pricing_session_url = SKY_live_pricing_API + '&$country=' + argv.c + '&currency=' + argv.cur + '&locale=' + argv.loc + '&locationSchema=iata&originplace=' + argv.originplace + '&destinationplace=' + argv.destinationplace + '&outbounddate=' + outbounddate + '&inbounddate=' + inbounddate + '&adults=' + argv.adults + '&groupPricing=' + argv.group + '&children=0&infants=0&cabinclass=Economy';
    return post(live_pricing_session_url, { form: requestBody });
}

function pollSession(sessionResponse) {
    var sessionUrl = sessionResponse.headers.location;

    var pollSessionUrl = sessionUrl + '?apiKey=' + apiKey + '&outbounddepartstarttime=' + outbounddepartstarttime + '&outbounddepartendtime=' + outbounddepartendtime + '&inbounddepartstarttime=' + inbounddepartstarttime + '&inbounddepartendtime=' + inbounddepartendtime;
    //const pollSessionUrl = `${sessionUrl}?apiKey=${apiKey}`;
    return get(pollSessionUrl, { timeout: 10000 });
}

function pollNextBatch(response) {
    debugger;
    var responseBody = JSON.parse(response.body);
    if (responseBody.Status === 'UpdatesComplete') {
        return response;
    } else {
        var nextBatchUrl = response.headers.location;
        var pollNextBatchUrl = nextBatchUrl + '&apiKey=' + apiKey + '&outbounddepartstarttime=' + outbounddepartstarttime + '&outbounddepartendtime=' + outbounddepartendtime + '&inbounddepartstarttime=' + inbounddepartstarttime + '&inbounddepartendtime=' + inbounddepartendtime;
        return get(pollNextBatchUrl, { timeout: 10000 });
    }
}

function getCurrencies() {
    return got.get(SKY_currencies_API, { headers: headers });
}

function getLocales() {
    return got.get(SKY_locales_API, { headers: headers });
}

function getCountries(locale) {
    var SKY_countries_URL = SKY_countries_API.replace('{locale}', locale);
    console.log(SKY_countries_URL);
    return got.get(SKY_countries_URL, { headers: headers });
}

exports.createSession = createSession;
exports.pollSession = pollSession;
exports.pollNextBatch = pollNextBatch;