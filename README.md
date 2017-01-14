<img src="https://github.com/NCBI-Hackathons/Visualizing_MeSH_Term_Interaction_Over_Time/blob/master/images/logos/meshgram-color.png" alt="MeSHgram" height="100" width="300">

<b>A tool to visually browse co-occurrence of MeSH terms in PubMeb.</b>

Publications indexed in PubMed have human curated MeSH terms associated with them.
We leverage these MeSH terms and create a visual search tool to find articles in PubMed.
The idea is that a visual inspection of co-occurrences is helpful for exploratory queries to PubMed.

## Software Artifacts

Server code was tested in Python 3.5 and Web client was tested in all major browsers except FireFox.

<b>url_gen.py</b> - generates Pubmed XML archive urls to be fed to wget to download.

<b>pm2mdb.py</b> - parses the downloaded Pubmed XML archives and loads them into Mongodb.

<b>server.py</b> - CherryPy based server that provides json end points for the Web Front End.

<b>config.txt</b> - CherryPy config file.

<b>terms.txt</b> - list of all MeSH terms, alphabetically sorted, extracted from the database.

<b>mesh_stopwords.txt</b> - "Stop words" among MeSH terms. We calculated the 100 most frequent MeSH terms across the entire corpus and manually curated some terms out.

## External Libraries / Packages
<b>lxml</b> - C library for fast native XML parsing.

<b>MongoDB</b> - Scalable NoSQL database.

<b>PyMongo</b> - Python driver for MongoDB.

<b>CherryPy</b> - A lightweight HTTP server. Used for REST/JSON in our project.

<b>nvd3</b> - D3 based javascript visualization library.

<b>jqcloud</b> - Javascript plug-in for wordcloud

## System Components
<img src="https://github.com/NCBI-Hackathons/Visualizing_MeSH_Term_Interaction_Over_Time/blob/master/readme-images/system-components.jpg" alt="System Components" height="500" width="800">

## Data Source
[FTP download from NLM bulk distribution for MEDLINE/PubMed](https://www.nlm.nih.gov/databases/download/data_distrib_main.html)
