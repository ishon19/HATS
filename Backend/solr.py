'''
    This file contains all the methods related to solr
'''

import pysolr
from constants import Constants
from flask import jsonify
from solr_utils import SolrUtils

class SolrServer:
    def __init__(self):
        self.solr = pysolr.Solr(
            'http://'+Constants.AWS_IP+':8983/solr/'+Constants.SOLR_CORE_NAME+'/', timeout=5000000, always_commit=True)

    def search_docs(self, query):
        print("[search_docs] Search Query: ", query)
        solr_query = SolrUtils.get_solr_query(query)
        response = self.solr.search(solr_query)
        final_response = SolrUtils.format_response(response)
        return final_response
