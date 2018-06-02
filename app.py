from flask import Flask, render_template, jsonify
from flask_pymongo import PyMongo
import soybean_db
# import soybean_news_scrape
import pymongo
import json
import pandas as pd
import os
import pymongo
from pymongo import MongoClient

mng_client = pymongo.MongoClient('localhost', 27017)
db = mng_client['app']

app = Flask(__name__)

mongo = PyMongo(app)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/index_IE')
def imp_exp():
    return render_template('index_IE.html')

@app.route('/financial')
def financial():
    return render_template('financial.html')

@app.route('/soybean_prices')
def soy_prices():
    """ Returns a dictionary of soybean prices """
    collection = db.soybean_prices
    query = collection.find()
    prices = []
    for q in query:
        price_dict = {}
        price_dict['Date'] = q['Date']
        price_dict['Price'] = q['Price']
        prices.append(price_dict)
    return jsonify(prices)

@app.route('/futures')
def corn_soy_futures():
    collection = db.corn_soy_futures
    query = collection.find()
    futures = []
    for q in query:
        futures_dict = {}
        futures_dict['Date'] = q['Date']
        futures_dict['CornPrice'] = q['CornPrice']
        futures_dict['SoyPrice'] = q['SoyPrice']
        futures_dict['ratio'] = q['ratio']
        futures.append(futures_dict)
    return jsonify(futures)

@app.route('/etf')
def soy_stocks():
    collection = db.soy_stocks
    query = collection.find()
    stocks = []
    for q in query:
        stocks_dict = {}
        stocks_dict['Date'] = q['Date']
        stocks_dict['Open'] = q['Open']
        stocks_dict['High'] = q['High']
        stocks_dict['Low'] = q['Low']
        stocks_dict['Close'] = q['Close']
        stocks_dict['Adj Close'] = q['Adj Close']
        stocks_dict['Volume'] = q['Volume']
        stocks.append(stocks_dict)
    return jsonify(stocks)

@app.route('/importers')
def importers():
    collection = db.importers
    query = collection.find()
    importers = []
    for q in query:
        importer_dict = {}
        importer_dict['Importer M49'] = q['Importer M49']
        importer_dict['Importer ISO3'] = q['Importer ISO3']
        importer_dict['Importer'] = q['Importer']
        importer_dict['Importer region'] = q['Importer region']
        importer_dict['Resource'] = q['Resource']
        importer_dict['Year'] = q['Year']
        importer_dict['value'] = q['value']
        importer_dict['weight'] = q['weight']
        importer_dict['percent'] = q['percent']
        importer_dict['loads'] = q['loads']
        importers.append(importer_dict)
    return jsonify(importers)

@app.route('/exporters')
def exporters():
    collection = db.exporters
    query = collection.find()
    exporters = []
    for q in query:
        exporter_dict = {}
        exporter_dict['id'] = q['id']
        exporter_dict['Exporter ISO3'] = q['Exporter ISO3']
        exporter_dict['Exporter'] = q['Exporter']
        exporter_dict['continent'] = q['continent']
        exporter_dict['Resource'] = q['Resource']
        exporter_dict['Year'] = q['Year']
        exporter_dict['value'] = q['value']
        exporter_dict['weight'] = q['weight']
        exporter_dict['percent'] = q['percent']
        exporter_dict['load'] = q['load']
        exporter_dict['Weight'] = q['Weight']
        exporters.append(exporter_dict)
    return jsonify(exporters)

@app.route('/news')
def news():
    collection = db.news_articles
    query = collection.find()
    news = []
    for q in query:
        news_dict = {}
        news_dict['date'] = q['date']
        news_dict['title'] = q['title']
        news_dict['url'] = q['url']
        news.append(news_dict)
    return jsonify(news)

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)