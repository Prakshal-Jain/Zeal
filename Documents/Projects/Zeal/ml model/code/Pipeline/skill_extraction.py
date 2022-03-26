from keybert import KeyBERT
import gensim
import wikipediaapi

# Load pre-trained Word2Vec model.
model = gensim.models.KeyedVectors.load_word2vec_format("musthave_dice_naruki_200d.model")
kw_model = KeyBERT()

# Sentence entered by user (posted idea)
sentence = "Create a program that can parse data from a hospital and update a website constantly using react."

def getWordsFromKeywords(keywords):
    return set(x[0] for x in keywords)

def getWikiKeywords(word):
    wiki_wiki = wikipediaapi.Wikipedia('en')
    page_py = wiki_wiki.page(word)
    summary = page_py.summary
    
    # Use keybert here to get most relevent keywords
    keywords = getWordsFromKeywords(kw_model.extract_keywords(summary))
    return keywords

# Find keywords
all_keywords = getWordsFromKeywords(kw_model.extract_keywords(sentence))

related_keywords = set()

all_skills = {}

for word in all_keywords:
    try:
        all_skills[word] = model.most_similar(word)
    except:
        related_keywords = related_keywords.union(getWikiKeywords(word))

if(not all_skills):
    # Check wikipedia related keywords too
    for word in all_keywords:
        try:
            all_skills[word] = model.most_similar(word)
        except:
            print('noting found for: ', word)

def flatten(t):
    return [item for sublist in t for item in sublist]

print(f'all_keywords: {all_keywords.union(related_keywords)}\n\nskills: {getWordsFromKeywords(flatten(all_skills.values()))}')