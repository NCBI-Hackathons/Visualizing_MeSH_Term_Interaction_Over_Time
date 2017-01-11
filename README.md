# MeSHup
<b>A tool to visually browse co-occurrence of MeSH terms in PubMeb.</b>

Publications indexed in PubMed have human curated MeSH terms associated with them.
We leverage these MeSH terms and create a visual search tool to find articles in PubMed.
The idea is that a visual inspection of co-occurrences is helpful for exploratory queries to Pub Med.

<b>Software Artifacts</b>

Server code was tested in Python 3.5 and Web client was tested in all major browsers except FireFox.

url_gen.py - generates Pubmed XML archive urls to be fed to wget to download.

pm2mdb.py - parses the downloaded Pubmed XML archives and loads them into Mongodb.

server.py - CherryPy based server that provides json end points for the Web Front End

config.txt - CherryPy config file

terms.txt - list of of mesh terms, alphabetically sorted, extracted from the database

mesh_stopwords.txt - 100 most frequent mesh terms across the entire corpus, with some terms manually curated out.

