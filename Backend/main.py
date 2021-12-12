'''
Backend implementation of the HATS search application.
'''

from flask import Flask, request, jsonify
from flask_cors import cross_origin
from solr import SolrServer

app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_root():
    '''
    Return the root of the API.
    '''
    return jsonify({'message': 'Welcome to the HATS API!'})


@app.route('/search', methods=['POST'])
@cross_origin()
def search():
    '''
    Return the results of a search.
    '''
    request_data = request.get_json()
    search_query = request_data['query']
    search_filters = request_data['filters']
    search_page = request_data['page_number']
    search_rows = request_data['rows_per_page']
    print("Search Query: ", search_query)
    print("Search Filters: ", search_filters)
    print("Search Page: ", search_page)
    print("Rows per Page: ", search_rows)

    # search the term
    solr_server = SolrServer()

    # health check
    print("[search] Health check: ", solr_server.solr.ping())

    # search
    response_obj, hits = solr_server.search_docs(
        search_query, search_filters, search_page, search_rows)
    return jsonify({'data': response_obj, 'total_data': hits})


@app.route('/get-pois', methods=['POST'])
@cross_origin()
def get_pois():
    request_data = request.get_json()
    num_pois = request_data['num_pois']
    print("num_pois:", num_pois)
    solr_server = SolrServer()

    # search
    response_obj = solr_server.find_pois(num_pois)
    return jsonify({'pois_data': response_obj, 'len_pois_data': len(response_obj)})


@app.route('/get-pois-tweet-count', methods=['GET'])
@cross_origin()
def get_poi_tweet_counts():
    print("Getting Poi tweet counts")
    solr_server = SolrServer()

    # search
    response_obj = solr_server.find_poi_counts()
    return jsonify({'pois_tweet_count_data': response_obj})


@app.route('/get-pois-tweet-sentiment', methods=['POST'])
@cross_origin()
def get_poi_sentiments():
    print("Getting Poi sentiments")
    request_data = request.get_json()
    poi_name = request_data['poi_name']
    solr_server = SolrServer()
    response_obj = solr_server.find_poi_sentiments(poi_name)
    return jsonify({'poi_sentiments': response_obj})


@app.route('/get-pois-tweet-date-count', methods=['POST'])
@cross_origin()
def get_poi_datewise_tweets():
    request_data = request.get_json()
    poi_name = request_data['poi_name']
    print("Getting tweets datewise for POI:" + poi_name)
    solr_server = SolrServer()
    response_obj = solr_server.get_tweets_by_date(poi_name)
    return jsonify({'data': response_obj})


@app.route('/get-tweet', methods=['POST'])
@cross_origin()
def get_tweet_by_id():
    '''
    Return the tweet doc by an ID.
    '''
    request_data = request.get_json()
    tweet_id = request_data['tweet_id']
    print("Getting Tweet by ID")

    # search the term
    solr_server = SolrServer()

    # search
    response_obj = solr_server.search_tweet_by_id(tweet_id)
    return jsonify({'data': response_obj})


@app.route('/get-replies', methods=['POST'])
@cross_origin()
def insights():
    '''
    Return the results of a search.
    '''
    request_data = request.get_json()
    search_id = request_data['tweet_id']
    print("Replies for Tweet ID: ", search_id)
    solr_server = SolrServer()
    response_obj = solr_server.search_replies(search_id)
    return jsonify({'data': response_obj})


@app.route('/get-language-dist', methods=['GET'])
@cross_origin()
def get_language_distribution():
    '''
    Return the number of hits of a particular language in a search.
    '''
    languages = ["en", "hi", "es"]
    print("Getting Language Distribution")

    # search the term
    solr_server = SolrServer()

    dist = {}

    for lang in languages:
        # search
        response_obj = solr_server.search_lang(lang)
        dist[lang] = response_obj
    return jsonify({'data': dist})


@app.route('/get-country-dist', methods=['GET'])
@cross_origin()
def get_country_distribution():
    '''
    Return the number of hits of a particular country in a search.
    '''
    countries = ["USA", "India", "Mexico"]
    print("Getting Country Distribution")

    # search the term
    solr_server = SolrServer()

    dist = {}

    for country in countries:
        # search
        response_obj = solr_server.search_country(country)
        dist[country] = response_obj
    return jsonify({'data': dist})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999, debug=True)
