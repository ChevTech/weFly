from elasticsearch import Elasticsearch

es = Elasticsearch()

def createIndex(indexName):
	result = es.indices.create(index='momondo')

def insertSearch(search):
	result = es.index(index='momondo', doc_type='searches', id=1, body=search)
	print(result)

def getItinerary(index, doc_type, id):
	result = es.get(index=index, doc_type=doc_type, id=id)
	return result

search = {
	"AdultCount": 1,
	"ChildAges": [],
	"Culture": "en-US",
	"DirectOnly": False,
	"IncludeNearby": False,
	"Market": "US",
	"TicketClass": "ECO",
	"Mix": "Segments",
	"Segments": [
		{
			"Origin": "LHR",
			"Destination": "NYC",
			"Depart": "2016-12-23T05:00:00.000Z", #Change this to an actual date object
			"Departure": "2016-12-23"			
		},
		{	
			"Origin": "NYC",
			"Destination": "LHR",
			"Depart": "2017-01-02T05:00:00.000Z",
			"Departure": "2017-01-02"
		}
	]
}

insertSearch(search);
