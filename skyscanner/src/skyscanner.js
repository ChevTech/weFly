//import { insertItinerary, getItinerary } from './database';
const request = require('request');
const denodeify = require('es6-denodeify')(Promise);
const post = denodeify(request.post);
const get = denodeify(request.get);
const open = require('open');

const outbounddepartstarttime = '20:00';
const outbounddepartendtime = '24:00';
const inbounddepartstarttime = '16:00';
const inbounddepartendtime = '21:00';


const apiKey = 'an491667891952729577555613864243';
const SKY_BASE_API = `http://partners.api.skyscanner.net/apiservices/pricing/v1.0/`;
const SKY_live_pricing_API = `http://partners.api.skyscanner.net/apiservices/pricing/v1.0/?apiKey=${apiKey}`;
const SKY_currencies_API = `http://partners.api.skyscanner.net/apiservices/reference/v1.0/currencies?apiKey=${apiKey}`; 
const SKY_locales_API = `http://partners.api.skyscanner.net/apiservices/reference/v1.0/locales?apiKey=${apiKey}`;
const SKY_countries_API = `http://partners.api.skyscanner.net/apiservices/reference/v1.0/countries/{locale}?apiKey=${apiKey}`;

const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json; charset=UTF-8',
    'X-Requested-With': 'XMLHttpRequest',
    'Connection': 'keep-alive',
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'Accept-Language: en-US,en;q=0.8'
};

function createSession(argv){
    const requestBody = {
        'country': argv.c,
        'currency': argv.cur,
        'locale': argv.loc,
        'locationSchema:': 'iata',
        'originplace': argv.originplace,
        'destinationplace': argv.destinationplace,
        'outbounddate': `${argv.outbounddate}`,
        'inbounddate': `${argv.inbounddate}`,
        'adults': argv.adults,
        'groupPricing': argv.group
    };

    const outbounddate = `${argv.outbounddate}`;
    const inbounddate = `${argv.inbounddate}`;

    const live_pricing_session_url = `${SKY_live_pricing_API}&$country=${argv.c}&currency=${argv.cur}&locale=${argv.loc}&locationSchema=iata&originplace=${argv.originplace}&destinationplace=${argv.destinationplace}&outbounddate=${outbounddate}&inbounddate=${inbounddate}&adults=${argv.adults}&groupPricing=${argv.group}&children=0&infants=0&cabinclass=Economy`;
    return post(live_pricing_session_url, {form:requestBody});
}

function pollSession(sessionResponse){
    const sessionUrl = sessionResponse.headers.location;

    const pollSessionUrl = `${sessionUrl}?apiKey=${apiKey}&outbounddepartstarttime=${outbounddepartstarttime}&outbounddepartendtime=${outbounddepartendtime}&inbounddepartstarttime=${inbounddepartstarttime}&inbounddepartendtime=${inbounddepartendtime}`;
    //const pollSessionUrl = `${sessionUrl}?apiKey=${apiKey}`;
    return get(pollSessionUrl, {timeout: 10000});
}

function pollNextBatch(response){
    debugger;
    const responseBody = JSON.parse(response.body);
    if( responseBody.Status === 'UpdatesComplete' ){
        return response;
    } else {
        const nextBatchUrl = response.headers.location;
        const pollNextBatchUrl = `${nextBatchUrl}&apiKey=${apiKey}&outbounddepartstarttime=${outbounddepartstarttime}&outbounddepartendtime=${outbounddepartendtime}&inbounddepartstarttime=${inbounddepartstarttime}&inbounddepartendtime=${inbounddepartendtime}`;
        return get(pollNextBatchUrl, {timeout: 10000});
    }
}

function getCurrencies(){
    return got.get(SKY_currencies_API, { headers: headers });
}

function getLocales(){
    return got.get(SKY_locales_API, { headers: headers });
}

function getCountries(locale){
    const SKY_countries_URL = SKY_countries_API.replace('{locale}', locale); 
    console.log(SKY_countries_URL);
    return got.get(SKY_countries_URL, { headers: headers});
}

export { createSession, pollSession, pollNextBatch };