import elasticSearchManager
import requests
import json
import time

momondo_api = "http://www.momondo.com/api/3.0/FlightSearch/"

searchResult = elasticSearchManager.getItinerary("momondo", "searches", "1")
search = searchResult['_source']
headers = {'content-type': 'application/json'}

result = requests.post(momondo_api, data = json.dumps(search), headers=headers )
resultJson = result.json()
searchId = resultJson["SearchId"]

def pollSession(sessionUrl):
	pollSessionResult = requests.get(sessionUrl)
	return pollSessionResult

api = momondo_api + searchId + "/0/true"

pollSessionResult = pollSession(api)
pollSessionResultJson = pollSessionResult.json()

itineraries = [pollSessionResultJson];

while (pollSessionResultJson != None):
	pollSessionResult = pollSession(api)
	pollSessionResultJson = pollSessionResult.json()
	itineraries.append(pollSessionResultJson)
	print(itineraries)
	time.sleep(1)