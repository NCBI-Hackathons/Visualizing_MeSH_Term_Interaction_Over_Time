import os, cherrypy
from itertools import chain

from pymongo import MongoClient
from json import dumps
from cherrypy.lib import static

path = os.path.abspath(os.path.dirname(__file__))
db = MongoClient()['pubmed']

auto_complete_list = ['One', 'Orange', 'Two', 'Tree', 'Three']

def counts(term_str):
    start_year = 1965; end_year = 2015
    try:
        terms = [s.strip() for s in term_str.split('|')]
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
    res = db.article.aggregate([
            {'$match': {'year': {'$gt': start, '$lt': end}, 'mesh': {'$in': terms}}},
            {'$project': {'_id': 0, 'mesh': 1}},
            {'$unwind': '$mesh'},
            {'$group': {'_id': "$mesh", 'count': {'$sum': 1}}},
            {'$sort': {'_id': 1}},
    ])
    results = [r for r in res]
    return dumps(results)

class HelloWorld(object):

    @cherrypy.expose()
    def freqs(self, terms):
        return counts(terms)

    @cherrypy.expose()
    def auto_complete(self, starter):
        return dumps([s for s in auto_complete_list if s.startswith(starter)][:3])

    def wcloud(self, start, end, qterms):
        terms = qterms.split('|')
        return word_cloud(start, end, terms)

    @cherrypy.expose
    def index(self):
        return static.serve_file(os.path.join(path, 'index.html'))

cherrypy.server.socket_host = '0.0.0.0'
cherrypy.config.update({'server.socket_port': 80})
cherrypy.response.headers["Access-Control-Allow-Origin"] = "*"
cherrypy.response.headers["Access-Control-Allow-Headers"] = "X-Requested-With"
cherrypy.quickstart(HelloWorld())
#print(counts('Electroretinography;Neoplasm Metastasis'))
