'''
The Server

Author: Ravi Teja Bhupatiraju
License: GPL
'''
import os, cherrypy
from pymongo import MongoClient
from json import dumps
from cherrypy.lib import static
from pprint import pprint

path = os.path.abspath(os.path.dirname(__file__))
db = MongoClient()['pubmed']

def wordlist(fn):
    'utility function to get a word list from a text feeder (one word per line)'
    f = open(fn)
    lines = f.readlines()
    f.close()
    return [line.strip() for line in lines]

auto_complete_list = wordlist('terms.txt')
mesh_stopwords = wordlist('mesh_stopwords.txt')

def counts(term_str):
    '''
    The main end-point for the line chart
    :param term_str: a pipe-separated list of mesh terms.
    :return: the frequencies of the terms by year, formatted for the JS widget
    '''
    start_year = 1965; end_year = 2015
    try:
        terms = [s.strip() for s in term_str.split('|')]
        if len(terms) > 1:
            terms.extend([term_str])

        results = []
        for term in terms:
            qterms = [s.strip() for s in term_str.split('|')] if '|' in term else [term]
            res = db.article.aggregate([{
                '$match': {
                'year': {'$gt': start_year - 1, '$lt': end_year + 1 },
                'mesh': {'$all': qterms}
            }},{
                '$group': {
                    '_id': "$year",
                    "count": {"$sum": 1}
                }},{
                '$sort': {'_id': 1}
            }])
            values = [{'x': r['_id'], 'y': r['count']} for r in res]
            results.append({'key': 'co-occurrence', 'values': values}) if '|' in term else results.append({'key': term, 'values': values})

        return dumps({
            "status": "SUCCESS",
            "data": results
        })
    except:
        return dumps({
            "status": "FAILURE",
        })

def word_cloud(start, end, terms):
    '''
    The endpoint for the word cloud
    :param start: start year
    :param end: end year
    :param terms: search mesh terms
    :return: other co-occurring terms with frequencies
    '''
    res = db.article.aggregate([
            {'$match': {'year': {'$gt': start, '$lt': end}, 'mesh': {'$all': terms}}},
            {'$project': {'_id': 0, 'mesh': 1}},
            {'$unwind': '$mesh'},
            {'$group': {'_id': "$mesh", 'weight': {'$sum': 1}}},
            {'$sort': {'weight': -1}},
    ])
    results = []
    extend = []
    for r in res:
        r['text'] = r['_id']
        del r['_id']
        r['link'] = "#"
        if r['text'] in terms:
            extend.append(r)
            continue
        if not r['text'] in mesh_stopwords:
            results.append(r)
    results = results[:25]
    results.extend(extend)
    return dumps(results)

class HelloWorld(object):

    @cherrypy.expose()
    def freqs(self, terms):
        'Line graph endpoint'
        return counts(terms)

    @cherrypy.expose()
    def auto_complete(self, term):
        'Search box auto-complete endpoint'
        term = term[term.rfind(',') + 1:].strip()
        return dumps([s.replace(',', '_') for s in auto_complete_list if s.lower().startswith(term.lower())][:10])

    @cherrypy.expose()
    def wcloud(self, start, end, qterms):
        'Word cloud endpoint'
        terms = [s.strip() for s in qterms.split('|')]
        return word_cloud(int(start), int(end), terms)

    @cherrypy.expose
    def index(self):
        'Home page'
        return static.serve_file(os.path.join(path, 'index.html'))

def server():
    'Server initialization'
    cherrypy.server.socket_host = '0.0.0.0'
    cherrypy.config.update({'server.socket_port': 8080})
    cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
    cherrypy.response.headers["Access-Control-Allow-Headers"] = "X-Requested-With"
    cherrypy.config.update('/home/ubuntu/hackathon/Visualizing_MeSH_Term_Interaction_Over_Time/config.txt')
    cherrypy.quickstart(HelloWorld(), '/', 'config.txt')

def local():
    #print(counts('Electroretinography;Neoplasm Metastasis'))
    pprint(word_cloud(1965, 2010, ['Ebolavirus']))
    #pprint(counts('Diabetes Mellitus'))

server()
#local()
