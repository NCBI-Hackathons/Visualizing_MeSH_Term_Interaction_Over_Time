from server import *
from json import loads

def test_wordlist():
    words = wordlist('mesh_stopwords.txt')
    print(len(words))
    assert len(words) == 64
    assert not '\n' in words[5]

def test_counts():
    dm = loads(counts('Diabetes Mellitus'))
    assert len(dm["data"][0]['values']) > 70 # 72

def test_word_cloud():
    assert len(word_cloud(1940, 2010, ['Diabetes Mellitus'])) > 3000 # 3358

