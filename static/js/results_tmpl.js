results_tmpl = doT.template('\
{{~it.result.matches :item:index}}\
<div class="media">\
	<a class="pull-left" href="#"><img src="http://graph.facebook.com/{{=item.attrs.author_id}}/picture" class="media-object" data-src="holder.js/64x64"/></a>\
	<div class="media-body">\
		<h4 class="media-heading"><a href="http://facebook.com/{{=item.attrs.author_id}}" target="_blank">{{=item.attrs.author_name}}</a></h4>\
		<p>{{=item.attrs.message}}</p>\
		{{?item.attrs.links_count > 0}}\
			<p><a class="show_links btn" postid={{=item.attrs.id}}>Show Links</a></p>\
			<div id="links_{{=item.attrs.id}}" style="display:none" postid={{=item.attrs.id}}></div>\
		{{?}}\
		<p><a href="http://facebook.com/{{=item.attrs.id}}" target="_blank">Go to Facebook Post</a></p>\
	</div>\
{{~}}');

links_tmpl = doT.template('\
{{?it.links}}\
	{{~it.links :item:index}}\
		<div>{{=item.title}} <a href="{{=item.url}}" target="_blank">{{=item.url}}</a></div>\
	{{~}}\
{{?}}\
{{? it.links.length == 0 }}\
	<div>No results found</div>\
{{?}}');

leaderboard_tmpl = doT.template('\
<table class="table">\
	<tr><th>Author</th><th>Post Count</th></tr>\
	{{~it.leaderboard :item:index}}\
		<tr>\
			<td><a href="http://facebook.com/{{=item.author_id}}" target="_blank">{{=item.author_name}}</a></td>\
			<td>{{=item.posts}}</td>\
		</tr>\
	{{~}}\
</table>');

popular_post_tmpl = doT.template('{{~it.popular :item:index}}\
   <div class="media">\
    <a class="pull-left" href="#">\
      <img src="http://graph.facebook.com/{{=item.author_id}}/picture">    </a>\
    <div class="media-body">\
      <h4 class="media-heading"><a href="http://facebook.com/{{=item.author_id}}">{{=item.author_name}}</a></h4>\
      <p>{{=item.message}} </p> \
      <p><a href="http://facebook.com/{{=item.id}}" target="_blank">Go to Facebook Post</a> | {{?item.comments_count}} {{=item.comments_count}} Comments</p>{{?}}\
       {{?item.likes_count}} {{=item.likes_count}} Likes{{?}}\
    </div>\
</div>\
{{~}}');
