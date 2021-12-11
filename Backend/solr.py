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

    def search_docs(self, query, filters, page, rows):
        print("[search_docs] Search Query: ", query)
        solr_query = SolrUtils.get_solr_query(query)
        solr_options = SolrUtils.get_options(filters, page, rows)
        response = self.solr.search(q=solr_query, **solr_options)
        hits = response.hits
        final_response = SolrUtils.format_response(response)
        return final_response, hits

    def search_replies(self, tweet_id):
        print("[search_docs] Search Tweet ID: ", tweet_id)
        solr_query = SolrUtils.get_solr_reply_query(tweet_id)
        response = self.solr.search(solr_query)
        final_response = SolrUtils.format_response(response)
        return final_response

    def search_all(self):
        solr_query = SolrUtils.get_select_all_query()
        response = self.solr.search(solr_query)
        final_response = SolrUtils.format_response(response)
        count_positives = len(
            [i for i in final_response if i['sentiment'] == 'Positive'])
        count_negatives = len(
            [i for i in final_response if i['sentiment'] == 'Negative'])
        count_neutral = len(
            [i for i in final_response if i['sentiment'] == 'Neutral'])
        
        return {"positive": count_positives, "negative": count_negatives, "neutral": count_neutral}

    def find_pois(self, num_pois):
        solr_pois = SolrUtils.get_pois_options()
        response = self.solr.search(
            q="poi_name:*", **solr_pois).facets['facet_fields']["poi_name"]
        final_response = SolrUtils.format_pois_response(response, num_pois)
        return final_response
