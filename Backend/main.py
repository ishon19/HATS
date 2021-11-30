'''
Backend implementation of the HATS search application.
'''

from flask import Flask, request, jsonify
from solr import SolrServer

app = Flask(__name__)


@app.route('/', methods=['GET'])
def get_root():
    '''
    Return the root of the API.
    '''
    return jsonify({'message': 'Welcome to the HATS API!'})


@app.route('/search', methods=['POST'])
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
    print("[search] Health check: ",solr_server.solr.ping())

    response_obj = solr_server.solr.search(search_query)
    print("response_obj: ", response_obj)

    # return the results
    to_return = []
    for result in response_obj:
        print("result: ", result)
        to_return.append(result)
        
    return jsonify({'data': jsonify(to_return)})


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=9999, debug=True)
