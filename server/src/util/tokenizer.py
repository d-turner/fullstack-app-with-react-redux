import sys
import nltk

from nltk.tokenize import sent_tokenize, word_tokenize
# nltk.download('punkt')
s1 = sys.argv[1]
words = word_tokenize(s1)
if (words == []):
  sys.stdout.write("ZZZXXXZZZXXX")
else:
  sys.stdout.write("ZZZXXXZZZXXX".join(words))
sys.stdout.flush()