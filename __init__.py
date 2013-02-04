from flask import Flask
import logging

app = Flask(__name__)
filehandler = logging.FileHandler(filename='/home/ssngeek/logs/user/error_cg.log')
filehandler.setLevel(logging.INFO)
app.logger.addHandler(filehandler)

from chennaigeeks import search

if __name__ == '__main__':
    app.run()

