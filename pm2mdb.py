# -*- coding: utf-8 -*-
'''
Pubmed to Mongodb loader.
Running on 16 cores will require around 40GB of RAM

Author: Ravi Teja Bhupatiraju
License: GPL

After running the script, create indexes manually

pubmed.article.createIndex( { "year": 1 } )
pubmed.article.createIndex( { "mesh": 1 } )

'''

import sys, pymongo as mdb, multiprocessing as mp
from lxml import etree

data_dir = '/home/ubuntu/data/'
fn_templ = 'medline17n0%s.xml.gz'
month = {'Jan': 1, 'Feb': 2, 'Mar': 3, 'Apr': 4, 'May': 5, 'Jun': 6, 'Jul': 7, 'Aug': 8, 'Sep': 9,  'Oct': 10, 'Nov': 11, 'Dec': 12 }
db = mdb.MongoClient().pubmed

def first(parent, expr):
    children = parent.xpath(expr)
    return children[0].text if len(children) > 0 else ''

def process_xml(fn):
    print(fn)
    root = etree.parse(data_dir + fn).getroot()
    for pmarticle in root.getchildren():
        pmid =  first(pmarticle, 'MedlineCitation/PMID')
        title = first(pmarticle, 'MedlineCitation/Article/ArticleTitle')
        pub_year = first(pmarticle, 'MedlineCitation/Article/Journal/JournalIssue/PubDate/Year')
        pub_month = first(pmarticle, 'MedlineCitation/Article/Journal/JournalIssue/PubDate/Month')

        if len(pub_year) != 4:
            medline_date = first(pmarticle, 'MedlineCitation/Article/Journal/JournalIssue/PubDate/MedlineDate')
            if len(medline_date) == 9 and medline_date[4] == '-': # 1976-1977
                pub_year = medline_date.split('-')[0]
                pub_month = ''
            else:
                # TODO: 1994-94 | 1981, re | 1978-1979, re
                try:
                    items = medline_date.split()
                    if len(items) == 2:
                        pub_year, month_range = items
                        if len(pub_year) == 9 and pub_year[4] == '-': # 1976-1977 Winter
                            pub_year = pub_year.split('-')[0]
                            pub_month = ''
                        else: # 1975 Jul-Aug
                            first_month = month_range.split('-')[0]
                            if first_month in month.keys() or first_month.title() in month.keys():
                                pub_month = first_month
                            else:
                                pub_month = ''
                    elif len(items) == 3:
                        if '-' in items[1]: # 1975 Dec-1976 Jan
                            pub_year, a, pub_month = items
                        else: # 1975 Aug 15-31 or 1990 Apr IL
                            pub_year, pub_month, a = items
                    elif len(items) == 4: # 1976 Aug 28-Sep 4
                        pub_year, pub_month, *a = items
                except:
                    print('Parse Issue:', pmid, medline_date, pub_year)

        if len(pub_year) == 4 and pub_year.isdigit():
            pub_year = int(pub_year) # could be a non-integer string
        else:
            print('Year Issue: ', pmid, pub_year, pub_month)
            pub_year = 0

        mesh = []
        for heading in pmarticle.xpath('MedlineCitation/MeshHeadingList/MeshHeading'):
            desc_name = heading.xpath('DescriptorName')[0]
            desc_text = desc_name.text
            desc_ui = desc_name.attrib['UI']
            mesh.append(desc_text)
        try:
            db.article.insert_one({'_id': pmid, 'title': title, 'year': pub_year, 'month': pub_month, 'mesh': mesh})
        except mdb.errors.DuplicateKeyError:
            print('Duplicate: ', pmid)

files = [fn_templ % str(i).zfill(3) for i in range(1, 892 + 1)]
if __name__ == '__main__':
    mp.Pool(16).map(process_xml, files)
    # db.article.createIndex({"year": 1}) # untested
    # db.article.createIndex({"mesh": 1}) # untested


