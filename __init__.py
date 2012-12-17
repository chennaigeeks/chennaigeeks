from flask import Flask
import logging

app = Flask(__name__)
filehandler = logging.FileHandler(filename='/home/ssngeek/logs/user/error_cg.log')
filehandler.setLevel(logging.INFO)
app.logger.addHandler(filehandler)

from chennaigeeks import search

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(debug=True)

class WebFactionMiddleware(object):
    def __init__(self, app):
        self.app = app
    def __call__(self, environ, start_response):
        environ['SCRIPT_NAME'] = '/chennaigeeks'
        return self.app(environ, start_response)

app.wsgi_app = WebFactionMiddleware(app.wsgi_app)
