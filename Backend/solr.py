'''
    This file contains all the methods related to solr
'''

import pysolr
from constants import Constants
from flask import jsonify


class SolrServer:
    def __init__(self):
        self.solr = pysolr.Solr(
            'http://localhost:8983/solr/'+Constants.SOLR_CORE_NAME+'/', timeout=5000000, always_commit=True)

    def search_docs(self, query):
        print("[search_docs] Search Query: ", query)
        response = self.solr.search(query)
        return response
