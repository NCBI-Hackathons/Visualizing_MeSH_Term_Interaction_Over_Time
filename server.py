import cherrypy
from pymongo import MongoClient
from bson.son import SON
from collections import OrderedDict
db = MongoClient()['pubmed']

def counts(terms):
    a = 1965
    b = 2015
    res = db.article.aggregate(
       [
        {
          '$match': {
            'year': {'$gt': a - 1, '$lt': b + 1 },
            'mesh': {'$in': terms}
            }
        },
        {
          '$group' : {
             '_id' : "$year",
             "count": {"$sum": 1}
          }
        },
        {'$sort': {'_id': 1}}
       ]
    )
    d = {}; wres = {}
    for r in res:
        d[r['_id']] = r['count']
    for i in range(a, b + 1):
        if i in d:
            wres[i] = d[i]
        else:
            wres[i] = 0
    return [{'x':k, 'y':wres[k]} for k in wres].__repr__()

class HelloWorld(object):

    @cherrypy.expose()
    def index(self):
        return "Hello World!"

    @cherrypy.expose()
    def freqs(self, terms):
        return counts([terms,])

cherrypy.quickstart(HelloWorld())

