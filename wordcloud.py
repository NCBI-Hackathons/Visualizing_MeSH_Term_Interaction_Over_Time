import os, cherrypy
from pymongo import MongoClient
from json import dumps
from cherrypy.lib import static
from pprint import pprint

path = os.path.abspath(os.path.dirname(__file__))
db = MongoClient()['pubmed']

def wordlist(fn):
    'utility function to get a word list from a text feeder (one word per line)'
    f = open('terms.txt')
    lines = f.readlines()
    f.close()
    return [line.strip() for line in lines]

mesh_stopwords = wordlist('mesh_stopwords.txt')

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
        if not r['text'] in mesh_stopwords:
            results.append(r)
    results = results[:25]
    results.extend(extend)
    return dumps(results)