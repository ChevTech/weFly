'use strict';

//import { insertItinerary, getItinerary } from './database';
var request = require('request');
var denodeify = require('es6-denodeify')(Promise);
var post = denodeify(request.post);
var get = denodeify(request.get);

var params = {
    body: {
        AdultCount: 1,
        Application: 'momondo',
        ChildAges: [],
        Consumer: 'momondo',
        Culture: 'en-US',
        Market: 'US',
        Mix: 'NONE',
        Mobile: false,
        Segments: [{
            Departure: '2016-11-15',
            Destination: 'NYC',
            Origin: 'LON'
        }],
        TicketClass: 'ECO'
    },
    json: true,
    method: 'POST',
    url: 'http://www.momondo.com/api/3.0/FlightSearch'
};

post(params).then(function (result) {
    var params = {
        url: 'http://www.momondo.com/api/3.0/FlightSearch' + '/' + result.body.SearchId + '/' + 0,
        json: true
    };

    get(params).then(function (result) {
        debugger;
    });

    debugger;
});