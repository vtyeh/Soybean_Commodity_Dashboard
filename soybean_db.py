import csv
import json
import pandas as pd
import os
import pymongo
from pymongo import MongoClient

def import_content(filepath):
    mng_client = pymongo.MongoClient('localhost', 27017)
    mng_db = mng_client['app']

    if filepath == 'data/soybean price.csv':
        collection = 'soybean_prices'
        db_cm = mng_db[collection]

    elif filepath == 'data/corn_soy_futures.csv':
        collection = 'corn_soy_futures'
        db_cm = mng_db[collection]
       
    elif filepath == 'data/SOYB.csv':
        collection = 'soy_stocks'
        db_cm = mng_db[collection]
    
    elif filepath == 'data/importer.csv':
        collection = 'importers'
        db_cm = mng_db[collection]
    
    elif filepath == 'data/exporter.csv':
        collection = 'exporters'
        db_cm = mng_db[collection]
    
    else:
        collection = 'news_articles'
        db_cm = mng_db[collection]

    cdir = os.path.dirname(__file__)
    file_res = os.path.join(cdir, filepath)

    data = pd.read_csv(file_res, encoding = 'unicode_escape')
    data_json = json.loads(data.to_json(orient='records'))
    db_cm.remove()
    db_cm.insert(data_json)

if __name__ == "__main__":
    filepaths = ['data/soybean price.csv', 'data/corn_soy_futures.csv', 
    'data/SOYB.csv', 'data/importer.csv', 'data/exporter.csv', 
    'data/soybean_articles.csv']
    
    for filepath in filepaths:
        import_content(filepath)