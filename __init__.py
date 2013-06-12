from flask import Flask
import logging
import config

app = Flask(__name__)
app.config.from_object('chennaigeeks.config')
filehandler = logging.FileHandler(filename=config.LOG_FILE_LOC)
filehandler.setLevel(logging.INFO)
app.logger.addHandler(filehandler)


from chennaigeeks import search

#Uncomment on server
#if __name__ == '__main__':
#    app.run()

