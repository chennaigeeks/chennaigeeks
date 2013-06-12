from flask import Flask
import logging
import config
import MySQLdb

app = Flask(__name__)
app.config.from_object('chennaigeeks.config')
filehandler = logging.FileHandler(filename=config.LOG_FILE_LOC)
filehandler.setLevel(logging.INFO)
app.logger.addHandler(filehandler)

db = MySQLdb.connect(user=config.DB_USERNAME, passwd=config.DB_PASSWORD, db=config.DB_NAME)

from chennaigeeks import search

#Uncomment on server
#if __name__ == '__main__':
#    app.run()

