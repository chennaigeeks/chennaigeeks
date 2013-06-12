import sphinxapi
import json
import MySQLdb
from chennaigeeks import app
from flask import Flask, jsonify, render_template, request, redirect, url_for
import config

@app.route('/', methods=['GET','POST'])
def index():
    return redirect(url_for('home'))

@app.route('/about')
def about():
    return render_template('about.html')
 
@app.route('/search')
@app.route('/search/')
@app.route('/search/<int:page>', methods=['GET'])
def search(page = 1):
    try:
        if len(request.args) > 0 and request.args['searchterm'] != None and request.args['searchterm'] != '': 
	    return render_search_template()
        else:
           return render_search_template() 
    except KeyError:
        return render_search_template()

@app.route('/api/search/')
@app.route('/api/search/<int:page>')
def searchapi(page=1):
    try:
        if len(request.args) > 0 and request.args['searchterm'] != None and request.args['searchterm'] != '': 
            searchterm = request.args['searchterm']
	    results = get_search_results(searchterm, page-1)
	    return jsonify(result=results)
        else:
           return jsonify(result='no matches found') 
    except KeyError:
        return jsonify(result='no matches found')


def get_search_results(searchterm, page):
    client = sphinxapi.SphinxClient()
    client.SetServer('localhost',21171)
    client.SetLimits(page*20, 20)
    client.SetSortMode(sphinxapi.SPH_SORT_TIME_SEGMENTS, "created")
    return client.Query(searchterm)

def process_search_results(results):
    jsondata = json.loads(str(results))
    return jsondata

def render_search_template():
    return render_template('searchform.html')

@app.route('/api/links/')
@app.route('/api/links/<post_id>')
def get_related_links(post_id = 'recent'): 
    db = MySQLdb.connect(user=config.DB_USERNAME, passwd=config.DB_PASSWORD, db=config.DB_NAME)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    if post_id == 'recent':
        cursor.execute("select t2.title, t2.url from links as t2 INNER JOIN posts as t1 on t1.id = t2.post_id order by t1.created_time desc limit 20")
    else:
        cursor.execute("SELECT url, title from links where post_id='"+post_id+"'")
    links = cursor.fetchall()
    db.close()
    return jsonify(links = links)

@app.route('/api/tags/')
def get_results_tags():
    client = sphinxapi.SphinxClient()
    client.SetServer('localhost',21171)
    client.SetLimits(0, 50)
    results = client.Query('')
    return render_template('tags.html', result=results["matches"])

@app.route('/tagcloud')
@app.route('/tagcloud/')
def render_tag_cloud():
    return render_template('tagcloud.html')

@app.route('/api/leaderboard')
@app.route('/api/leaderboard/<time>')
def get_leaderboard(time = 'all'):
    db = MySQLdb.connect(user=config.DB_USERNAME, passwd=config.DB_PASSWORD, db=config.DB_NAME)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    if time == 'all':
        cursor.execute("select author_name, author_id, count(*) as posts from posts group by author_id order by posts desc limit 10;")
    elif time == 'month':
        cursor.execute("select author_name, author_id, count(*) as posts from (select * from posts where PERIOD_DIFF(EXTRACT(YEAR_MONTH FROM NOW()), EXTRACT(YEAR_MONTH FROM created_time)) = 1) as tmp group by author_id order by posts desc limit 10;")
    top  = cursor.fetchall()
    db.close()
    return jsonify(leaderboard = top)

@app.route('/api/postcount')
@app.route('/api/postcount/<time>')
def get_post_count(time = 'all'):
    db = MySQLdb.connect(user=config.DB_USERNAME, passwd=config.DB_PASSWORD, db=config.DB_NAME)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    try:
        if time == 'all':
	    cursor.execute("select count(*) as total from posts;")
    	elif time == 'monthly':
            year = request.args['year']
            month = request.args['month'] 
            cursor.execute("select month(created_time) as month,count(*) as posts from posts where month(created_time) = "+month+" and year(created_time)='"+year+"' group by month(created_time)")
	elif time == 'yearly':
            year = request.args['year']
            cursor.execute("select month(created_time) as month,count(*) as posts from posts where month(created_time) = (select distinct(month(created_time))) and year(created_time)='"+year+"' group by month(created_time)")
	count  = cursor.fetchall()
        db.close()
        return jsonify(postcount = count)

    except:
        return jsonify(error = "improper arguments")

@app.route('/api/popular/')
@app.route('/api/popular/<time>')
def get_popular_posts(time = 'all'):
    db = MySQLdb.connect(user=config.DB_USERNAME, passwd=config.DB_PASSWORD, db=config.DB_NAME)
    cursor = db.cursor(MySQLdb.cursors.DictCursor)
    try:
    	if time == 'all':
            if request.args['type'] == 'comments':
                cursor.execute("select id, author_id, author_name, message, comments_count from posts order by comments_count desc limit 10")
            elif request.args['type'] == 'likes':
                cursor.execute("select id, author_id, author_name, message, likes_count from posts order by likes_count desc limit 10")
        elif time == 'monthly':
            month = request.args['month']
            year = request.args['year']
            if request.args['type'] == 'comments':
                cursor.execute("select id, author_id, author_name, message, comments_count from posts where month(created_time)= '"+month+"' and year(created_time)='"+year+"' order by comments_count desc limit 10")
            elif request.args['type'] == 'likes':
                cursor.execute("select id, author_id, author_name, message, likes_count from posts where month(created_time)= '"+month+"' and year(created_time)='"+year+"' order by likes_count desc limit 10")
        posts = cursor.fetchall()
        db.close()
        return jsonify(popular = posts)
    except:
        return jsonify(error = "improper arguments")

@app.route('/home')
def home():
    return render_template('home.html')

@app.route('/permalink/<post_id>/')
@app.route('/permalink/<post_id>')
def permalink(post_id):
    return render_template('permalink.html', post_id = post_id)

@app.route('/wikitree')
def gen_wikitree():
    try:
        treestring = request.args["treestring"]
        return render_template('wikitree.html', treestring = treestring)
    except KeyError:
        abort(403)
    except:
        abort(401)
