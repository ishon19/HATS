'''
    This file contains all the methods related to solr
'''

import pysolr
from constants import Constants
from flask import jsonify
from solr_utils import SolrUtils
from collections import Counter


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
        
    def get_tweets_by_date(self, poi_name):
        formatted_poi_query = SolrUtils.get_poi_query(poi_name)
        hits = self.solr.search(q=formatted_poi_query, start = 0, rows = 0).hits
        response = self.solr.search(q=formatted_poi_query, start = 0, rows = hits, fl = "tweet_date")
        date_counter = Counter()
        date_counter = SolrUtils.count_dates(response, date_counter)
        # final_response = SolrUtils.sentiment_counts(response)
        return date_counter

    def search_lang(self, lang):
        print("[search_docs] Search Language: ", lang)
        solr_query = SolrUtils.get_lang_counts(lang)
        response = self.solr.search(solr_query)
        hits = response.hits
        return hits

    def search_country(self, country):
        print("[search_docs] Search Country: ", country)
        solr_query = SolrUtils.get_country_counts(country)
        response = self.solr.search(solr_query)
        hits = response.hits
        return hits
        
    def find_pois(self, num_pois):
        solr_pois = {
            'start': 0,
            'rows': 0,
            "facet": "true",
            "facet.field": "poi_name"
        }
        response = self.solr.search(q="poi_name:*", **solr_pois).facets['facet_fields']["poi_name"]
        mid_response = SolrUtils.format_pois_response(response)
        final_response = SolrUtils.top_n_pois(mid_response, num_pois)
        return final_response
    
    def find_poi_counts(self):
        solr_pois = {
            'start': 0,
            'rows': 0,
            "facet": "true",
            "facet.field": "poi_name"
        }
        response = self.solr.search(q="poi_name:*", **solr_pois).facets['facet_fields']["poi_name"]
        final_response = SolrUtils.format_pois_response(response)
        return final_response

    def find_poi_sentiments(self, poi_name):
        formatted_poi_query = SolrUtils.get_poi_query(poi_name)
        # hits = self.solr.search(q=formatted_poi_query, start = 0, rows = 0).hits
        response = self.solr.search(q=formatted_poi_query, start = 0, rows = 100, fl = "tweet_text")
        final_response = SolrUtils.sentiment_counts(response)
        return final_response

    def search_tweet_by_id(self, tweet_id):
        print("[search_docs] Search Tweet ID: ", tweet_id)
        solr_query = SolrUtils.get_search_by_tweet_query(tweet_id)
        response = self.solr.search(solr_query)
        final_response = SolrUtils.format_response(response)
        return final_response

        
    