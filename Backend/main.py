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
    print("Search Query: ", search_query)

    # search the term
    solr_server = SolrServer()

    # health check
    print("[search] Health check: ", solr_server.solr.ping())

    # search
    response_obj = solr_server.search_docs(search_query)
    return jsonify({'data': response_obj})


@app.route('/search/insights', methods=['POST'])
@cross_origin()
def insights():
    '''
    Return the results of a search.
    '''
    request_data = request.get_json()
    search_id = request_data['tweet_id']
    print("Replies for Tweet ID: ", search_id)

    # search the term
    solr_server = SolrServer()

    # health check
    print("[search] Health check: ", solr_server.solr.ping())

    # search
    response_obj = solr_server.search_replies(search_id)
    return jsonify({'data': response_obj})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999, debug=True)
