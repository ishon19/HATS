'''
    This file contains the utility methods for solr
'''

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
    
    def format_response(response):
        '''
            format the response
        '''
        formatted_response = []
        for doc in response:
            formatted_response.append(doc)
        return formatted_response