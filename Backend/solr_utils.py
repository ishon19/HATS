'''
    This file contains the utility methods for solr
'''
from collections import OrderedDict

from sentiment_analyser import SentimentAnalyzer
import pandas as pd
#from Get_count_and_plots import GetCount


class SolrUtils:
    '''
        Helper functions 
    '''
    def get_solr_query(query_string):
        '''
            return the query string
        '''
        query_tokens = query_string.split(' ')
        modified_query = ''
        for token in query_tokens:
            modified_query += 'tweet_text:'+token+' OR '
        modified_query = modified_query[:-4]
        return modified_query

    def get_solr_reply_query(tweet_id):
        '''
            return the query string to fetch reply tweets
        '''
        modified_query = 'replied_to_tweet_id:' + tweet_id
        return modified_query

    def get_lang_counts(lang):
        '''
            return the query string to tweets in a particular language
        '''
        modified_query = 'tweet_lang:' + lang
        return modified_query

    def get_country_counts(country):
        '''
            return the query string to tweets in a particular language
        '''
        modified_query = 'country:' + country
        return modified_query
    
    def get_poi_query(self, poi_name):
        return 'poi_name:\"' + poi_name + "\""
        
    def get_options(filters, page, row):
        # parse for the filters
        # Note: assuming 10 rows for page
        rows = page * row
        start = rows - row
        filt = []
        if 'pois' in filters:
            temp = ""
            print(type(filters['pois']))
            for f in filters['pois']:
                print(f)
                temp += 'poi_name:\"' + f + '\" OR '
            temp = temp[:-4]
            filt.append(temp)
        if 'country' in filters:
            temp = ""
            print(type(filters['country']))
            for f in filters['country']:
                print(f)
                temp += 'country:\"' + f + '\" OR '
            temp = temp[:-4]
            filt.append(temp)
        if 'language' in filters:
            temp = ""
            print(type(filters['language']))
            for f in filters['language']:
                print(f)
                temp += 'tweet_lang:\"' + f + '\" OR '
            temp = temp[:-4]
            filt.append(temp)

        options = {
            "start": start,
            "rows": rows
        }
        if filt:
            options["fq"] = filt
        return options

    def get_pois_options():
        options = {
            'start': 0,
            'rows': 0,
            "facet": "true",
            "facet.field": "poi_name"
        }
        return options

    def format_pois_response(self, response):
        formatted_response = OrderedDict()
        for i in range(len(response)):
            if (i % 2 == 0):
                formatted_response[response[i]] = response[i+1]
        return formatted_response #returns all pois to their tweet counts
    
    def top_n_pois(self, response, num_pois):
        formatted_response = []
        for (k,v) in response.items():
            formatted_response.append(k)
            if(len(formatted_response) == num_pois):
                break
        return formatted_response
    
    def format_response(response):
        '''
            format the response
        '''
        formatted_response = []
        for doc in response:
            temp_doc = []
            temp_doc.append(doc)
            sentimentAnalyser = SentimentAnalyzer(temp_doc)
            doc = sentimentAnalyser.get_sentiment()
            #counts = GetCount(temp_doc).getCount()
            formatted_response.append(doc)
            print("[format_response] Doc: ", doc)
        #counts = GetCount(formatted_response).getCount()
        return formatted_response


    def GetCount(response):
        dataframe = pd.DataFrame(response)
        sentiment_counts = dict(dataframe["Sentiment"].value_counts())
        return sentiment_counts


    def sentiment_counts(response):
        sentiment_counts = {"Positive": 0, "Neutral": 0, "Negative": 0}
        for doc in response:
            temp_doc = []
            temp_doc.append(doc)
            sentimentAnalyser = SentimentAnalyzer(temp_doc)
            doc = sentimentAnalyser.get_sentiment_counts()
            sentiment_counts["Positive"] += doc["Positive"]
            sentiment_counts["Neutral"] += doc["Neutral"]
            sentiment_counts["Negative"] += doc["Negative"]
        return sentiment_counts
