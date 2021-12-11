'''
    This file contains the utility methods for solr
'''
from sentiment_analyser import SentimentAnalyzer


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

    def get_select_all_query():
        '''
            return the select all query
        '''
        query = '*:*'
        return query

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

    def get_pois_options(self):
        options = {
            'start': 0,
            'rows': 0,
            "facet": "true",
            "facet.field": "poi_name"
        }
        return options

    def format_pois_response(self, response, num_pois):
        formatted_response = []
        for i in range(len(response)):
            if (i % 2 == 0):
                formatted_response.append(response[i])
            if (len(formatted_response) == num_pois):
                break
        print("Top", num_pois, "pois is", formatted_response)
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
            formatted_response.append(doc)
            # print("[format_response] Doc: ", doc)
        return formatted_response
