import pandas as pd
import matplotlib.pyplot as plt
import json
from pprint import pprint
import csv
from datetime import datetime

data = pd.read_csv("data.csv")

print(data)

data.plot(x = "Date", y = "Mexico_rolling")
data.plot(x = "Date", y = "India_rolling")
data.plot(x = "Date", y = "US_rolling")

data = {}
     
with open("data.csv") as csvf:
    csvReader = csv.DictReader(csvf)

    for rows in csvReader:
        key = str(datetime.strptime(str.replace(rows['Date'], "/", " "), '%m %d %y'))
        data[key] = rows

for value in list(data.values()):
    for key in list(value.keys()):
        if key == "Date":
            del value[key]

with open("data.json", 'w') as jsonf:
    jsonf.write(json.dumps(data, indent=4))

pprint(data)