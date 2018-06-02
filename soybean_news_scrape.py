# Import Dependencies
import os
import pandas as pd
from bs4 import BeautifulSoup as bs
from splinter import Browser
import time
import csv

def init_browser():
    """ Connects path to chromedriver """
    
    executable_path = {'executable_path': '/Users/venessayeh/Desktop/Commodity-Dashboard/chromedriver'}
    return Browser("chrome", **executable_path, headless=True)

def reset(url):
    """ Reset the url and browser connection everytime a new page is clicked to parse new page"""
    
    browser = init_browser()
    browser.visit(url)

    news_html = browser.html
    news_soup = bs(news_html, "lxml")

    headline_list = news_soup.find_all('div', class_='record')
    
    # Find new information for new page
    return scrape(headline_list, news_soup)

def scrape(headline_list, news_soup):
    """ Find information of news articles on soybeans"""
    
    # Create loop to go through all found article headlines
    for headline in headline_list:
        
        # Create a dictionary to hold information of each soybean article
        news_dict = {} 
        
        # Find the description and headlines of all articles
        description = headline.find('div', class_='abstract').text
        find_title = headline.find('a', class_='more')
        
        # Set variable for url head for news article urls and next page urls
        news_site = 'https://www.foodbusinessnews.net'
        
        # Create an if statement to find articles that contain 'soybeans' in description or headline
        if any(x in description.lower() for x in ['soybean', 'soybeans']):
            
            # Find the headline title
            title = find_title['title']
            news_dict['title'] = title
            
            # Find the date of article
            date = headline.find('div', class_='date').text
            news_dict['date'] = date
            
            # Find the article url
            href = headline.find('a', class_='more')
            link = news_site + href['href']
            news_dict['url'] = link
            
            # Append the dictionary to the main list
            main_list.append(news_dict)
            
        else:
            print(None)
    
    # Find the next page and send it to the reset function to scrape new page
    try: 
        find_next_page = news_soup.find('a', class_='next_page')
        next_page = news_site + find_next_page['href']
        time.sleep(2)
        reset(next_page)
    except: 
        
        # If there is no next page, print 'end of search'
        return "End of search."

# Create a main list to store all dictionaries of news article information 
main_list = []

# Set variable for initial url of Food Business News
news_url = 'https://www.foodbusinessnews.net/search?Submit=Submit&author=&datatype=&edition=&end_date=&exclude_datatypes%5B%5D=blog&ip=169.234.124.198&page=1&q=soybeans+prices&start_date=12%2F1%2F2010&utf8=%E2%9C%93'

# Begin scrape by sending it to the reset browser function
reset(news_url)

# Convert main list of article dictionaries into a csv file
keys = ['date', 'title', 'url']
with open('data/soybean_articles.csv', 'w') as output_file:
    writer = csv.DictWriter(output_file, keys)
    writer.writeheader()
    writer.writerows(main_list)