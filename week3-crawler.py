import urllib.request as request
import json

src="https://padax.github.io/taipei-day-trip-resources/taipei-attractions.json"
with request.urlopen(src) as response:
    data=json.load(response)
clist=data["result"]["results"]

with open('data.txt','w',encoding='utf-8') as file:
    for company in clist:
        images=company['file'].split('http://')
        images='http://'+images[1]
        file.write(company["stitle"]+","+ company["longitude"]+","+company["latitude"]+","+images+"\n")
