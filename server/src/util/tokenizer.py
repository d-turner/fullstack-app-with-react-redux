import sys
import nltk

from nltk.tokenize import sent_tokenize, word_tokenize, WhitespaceTokenizer, RegexpTokenizer, TweetTokenizer
# nltk.download('punkt')
s1 = sys.argv[1]
# words = word_tokenize(s1)
tknzr = TweetTokenizer()
#tknzr = WhitespaceTokenizer()
words = tknzr.tokenize(s1)
if (words == []):
  sys.stdout.write("ZZZXXXZZZXXX")
else:
  sys.stdout.write("ZZZXXXZZZXXX".join(words))
sys.stdout.flush()