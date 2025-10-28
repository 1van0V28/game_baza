# run.py
from scrapy.crawler import CrawlerProcess
from scrapy.utils.project import get_project_settings
from spiders.steam_spider import SteamSpider

if __name__ == "__main__":

    process = CrawlerProcess()
    process.crawl(SteamSpider)
    process.start()
