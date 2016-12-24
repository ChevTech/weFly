//import { insertItinerary, getItinerary } from './database';
const request = require('request');
const denodeify = require('es6-denodeify')(Promise);
const post = denodeify(request.post);
const get = denodeify(request.get);

const params = {
    body: {
        AdultCount: 1,
        Application: 'momondo',
        ChildAges: [],
        Consumer: 'momondo',
        Culture: 'en-US',
        Market: 'US',
        Mix: 'NONE',
        Mobile: false,
        Segments: [
            {
                Departure: '2016-11-15',
                Destination: 'NYC',
                Origin: 'LON'
            }
        ],
        TicketClass: 'ECO'
    },
    json: true,
    method: 'POST',
    url: 'http://www.momondo.com/api/3.0/FlightSearch'
};

post(params).then( result => {
    const params = {
        url: 'http://www.momondo.com/api/3.0/FlightSearch' + '/' + result.body.SearchId + '/' + 0,
        json: true
    };

    get(params).then( result => {
        debugger;
    });

    debugger;
});
