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
            'http://localhost:8983/solr/' + Constants.SOLR_CORE_NAME + '/', timeout=5000000, always_commit=True)
    
    def search_docs(self, query, filters, page, rows):
        print("[search_docs] Search Query: ", query)
        solr_query = SolrUtils.get_solr_query(query)
        solr_options = SolrUtils.get_options(filters, page, rows)
        response = self.solr.search(q=solr_query, **solr_options)
        final_response = SolrUtils.format_response(response)
        return final_response
    