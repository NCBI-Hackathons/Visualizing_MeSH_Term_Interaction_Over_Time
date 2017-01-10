import cherrypy
from pymongo import MongoClient
from json import dumps

db = MongoClient()['pubmed']

def counts(term_str):
    a = 1965
    b = 2015
    try:
        terms = [s.strip() for s in term_str.split(';')]
        terms.extend([term_str])

        results = []
        for term in terms:
            qterms = [s.strip() for s in term_str.split(';')] if ';' in term else [term]
            res = db.article.aggregate(
               [
                {
                  '$match': {
                    'year': {'$gt': a - 1, '$lt': b + 1 },
                    'mesh': {'$all': qterms}
                    }
                },
                {
                  '$group': {
                     '_id': "$year",
                     "count": {"$sum": 1}
                  }
                },
                {'$sort': {'_id': 1}}
               ]
            )
            values = [{'x': r['_id'], 'y': r['count']} for r in res]
            found_years = [r['_id'] for r in res]
            for year in range(a, b):
                if not year in found_years:
                    values.append({'x': year, 'y': 0})
            results.append({'key': 'co-occurrence', 'values': values}) if ';' in term else results.append({'key': term, 'values': values})

        return dumps({
            "status": "SUCCESS",
            "data": results
        })
    except:
        return dumps({
            "status": "FAILURE",
        })

class HelloWorld(object):

    @cherrypy.expose()
    def freqs(self, terms):
        return counts(terms)

    @cherrypy.expose()
    def index(self):
        return 'Hello World!'

cherrypy.response.headers["Access-Control-Allow-Origin"] = "http://localhost"
cherrypy.quickstart(HelloWorld())
#print(counts('Electroretinography;Neoplasm Metastasis'))