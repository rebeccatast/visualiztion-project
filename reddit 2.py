#!/usr/bin/env python
# coding: utf-8

# In[1]:


pip install praw


# In[2]:


import praw
import json
import csv
import re
import requests


# In[3]:


reddit = praw.Reddit(
    client_id ="YOUR CLIENT ID",
    client_secret ="YOUR CLIENT SECRET",
    password = "YOUR REDDIT PASSWORD",
    user_agent = "YOUR USER AGENT",
    username="YOUR REDDIT USERNAME",
)

print(reddit.user.me())


# In[4]:


subred = reddit.subreddit("wallstreetbets")


# In[5]:


hot = subred.hot(limit = 100)


# In[6]:


type(hot)


# In[7]:


for i in hot:
    print(i.title, i.subreddit_id)


# In[8]:


subred = reddit.subreddit ('wallstreetbets')
hot = subred.hot(limit = 200)
words_collection = []


# In[9]:


for submission in hot:
    title = submission.title
    title_words = title.split()
    words_collection.append(title_words)

print(words_collection)


# In[10]:


subred = reddit.subreddit ('dogecoin')
hot_subred = subred.hot(limit=350)
words_collection = []


# In[11]:


for submission in hot_subred:
    title = submission.title
    title_words = title.split()
    words_collection.append(title_words)

print(words_collection)


# In[13]:


import csv
from collections import Counter
from collections import defaultdict
data = words_collection


# In[14]:


file = open('//dogewords.csv', 'w', newline ='')
with file:
    write = csv.writer(file)
    write.writerows(data)


# In[15]:


words = []
with open ('//dogewords.csv', 'rt') as csvfile:
    reader = csv.reader(csvfile)
    next(reader)
    for col in reader:
        csv_words = col[0].split(' ')
        for i in csv_words:
            words.append(i)
    
with open('//dogecount.csv', 'a+') as csvfile:
    writer = csv.writer(csvfile, delimiter = ',')
    for i in words:
        x = words.count(i)
        words.append((i,x))
    writer.writerow(words)


# In[ ]:




