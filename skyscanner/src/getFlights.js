import { createSession, pollSession, pollNextBatch } from './skyscanner';
import { email } from './mailer';
import _ from 'underscore';

const yargs = require('yargs');
let bestPrice = 1000;

const argv = yargs
    .option('country', {
        alias: 'c',
        describe: 'country of residence',
        demand: true,
        default: 'US'
    })
    .option('currencies', {
        alias: 'cur',
        describe: 'currencies of residence',
        demand: true,
        default: 'USD',
    })
    .option('locale', {
        alias: 'loc',
        describe: 'The user’s localization preference',
        demand: true,
        default: 'en-US'
    })
    .option('originplace', {
        alias: 'orig', 
        describe: 'The origin city or airport',
        demand: true
    })
    .option('destinationplace', {
        alias: 'dest',
        describe: 'The destination city or airport',
        demand: true    
    })
    .option('outbounddate', {
        alias: 'dep',
        describe: 'The departure date',
        demand: true
    })
    .option('inbounddate', {
        alias: 'ret',
        describe: 'The return date',
        demand: true
    })
    .option('open', {
        alias: 'o',
        describe: 'Open lowest price in browser',
        boolean: true
    })
    .option('adults', {
        describe: 'The number of adults',
        default: 1
    })
    .option('groupPricing', {
        alias: 'group',
        describe: 'Price for all passengers',
        boolean: true 
    }).argv;

let timeout = 0;

(function main(argv, timeout){
    setTimeout(function(){
        createSession(argv)
            .then(pollSession)
            .then(pollNextBatch)
            .then(pollNextBatch)
            .then(processResult);

        timeout = 300000;
        main(argv, timeout);
    }, timeout);
})(argv, timeout);

function processResult(result){
    debugger;
    const resultJSON = JSON.parse(result.body); 

    const itineraries = resultJSON.Itineraries;

    let emailText = '';

    for(const itinerary of itineraries){
        const pricingOptions = itinerary.PricingOptions;
        for(const details of pricingOptions){
            if( details.Price <= bestPrice ){
                emailText = emailText + details.Price + ' ' + details.DeeplinkUrl + '\n';
                bestPrice = details.Price;
            }
        }
    }

    bestPrice = bestPrice - 1;
                
    if(emailText.length > 0){
        email(emailText);
    }
}

/*const sessionKey = result.headers.location;
            pollSession(sessionKey).then( result => {
                const resultJSON = JSON.parse(result.body);
                if(resultJSON.Status === 'UpdatesPending'){
                    const nextPollKey = result.headers.location;
                    simplePoll(nextPollKey).then( result => {
                        debugger;

                    });
                } else {
                    handleResult(resultJSON);
                }
            }).then( result => {
                debugger;
                
            });
        }).catch( error => console.log(error));
*/

/*         if(argv.open){
                    open(itineraryRecord.deeplink, 'chrome');
                }*/

            
            /*// Store the price in a MongoDb
            insertItinerary(itineraryRecord).then( result => {
                console.log(result);
            })*/