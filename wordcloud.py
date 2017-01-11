res = db.article.aggregate([
	{'$match': {'year': {'$gt': 2010, '$lt': 2015}}},
    {'$project': {'_id': 0, 'mesh': 1}},
    {'$unwind': '$mesh'},
    {'$group': {'_id': "$mesh", 'count': {'$sum': 1}}},
    {'$sort': {'count': -1}},
])