'''
Simple script to generate Pubmed archive URLs.
Download via:
url_gen.py > urls.txt
wget -i urls.txt

Author: Ravi Teja Bhupatiraju
License: GPL
'''
templ = 'ftp://ftp.ncbi.nlm.nih.gov/pubmed/baseline/medline17n0%s.xml.gz'
for i in range(1, 892 + 1):
    cmd = templ % str(i).zfill(3)
    print(cmd)