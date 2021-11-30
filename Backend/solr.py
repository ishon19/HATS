'''
    This file contains all the methods related to solr
'''

import pysolr


class SolrServer:
    def __init__(self):
        self.solr = pysolr.Solr(
            'http://localhost:8983/solr/IRF21P1', timeout=10, always_commit=True)
        self.solr.ping()

    def search_docs(self, query):
        return self.solr.search(query)
