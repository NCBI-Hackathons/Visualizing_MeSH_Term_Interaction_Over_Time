db.article.aggregate(
               [
                {$match: {'year': {'$gt': 1965, '$lt': 2010 },'mesh': {'$in': ['Ebolavirus']}}},
                {$project: { _id: 0, mesh: 1 } },
  				{$unwind: "$mesh" },
                {$group: {'_id': "$mesh",count: {"$sum": 1}}},
                {$sort: {'_id': 1}}
               ]
            )