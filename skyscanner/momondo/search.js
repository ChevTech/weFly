var momondo = require('momondo');

momondo[10].search(
    {
        'lang': 'us',
        'routes':[
            {
                'from': 'LON',
                'to': 'NYC',
                'date': '2016-11-15',
            }
        ]
    },

    function(error, solutions){
        console.log(JSON.stringify(error|| solutions, null, 2));
    }
);