results_tmpl = doT.template('\
{{~it.result.matches :item:index}}\
<div class="media">\
	<a class="pull-left" href="#"><img src="http://graph.facebook.com/{{=item.attrs.author_id}}/picture" class="media-object" data-src="holder.js/64x64"/></a>\
	<div class="media-body">\
		<h4 class="media-heading"><a href="http://facebook.com/{{=item.attrs.author_id}}" target="_blank">{{=item.attrs.author_name}}</a></h4>\
		<p>{{=item.attrs.message}}</p>\
		<p>\
		{{?item.attrs.links_count > 0}}\
			<p><a title="Show links on this post" class="show_links" style="cursor:pointer;" postid={{=item.attrs.id}}><i class="icon-bookmark icon-large"></i></a> | \
		{{?}}\
		<a title="View Comments" rel="leanModal" name="comments_{{=item.attrs.id}}" tabindex="-1" href="#comments_{{=item.attrs.id}}" class="comments" postid={{=item.attrs.id}}><i class="icon-comment icon-large"></i></a> | \
		<a title="Post Permalink" href="http://chennaigeeks.in/permalink/{{=item.attrs.id}}"><i class="icon-link icon-large"></i></a> | \
		<a title="View Post on Facebook" href="http://facebook.com/{{=item.attrs.id}}" target="_blank"><i class="icon-facebook icon-large"></i></a></p>\
		{{?item.attrs.links_count > 0}}\
			<div id="links_{{=item.attrs.id}}" style="display:none; margin-left:20px;" postid={{=item.attrs.id}}></div></p>\
		{{?}}\
		<div id="comments_{{=item.attrs.id}}" class="commentsModalWindow"><a class="modal_close"></a><div class="scroll-pane"></div></div>\
	</div>\
{{~}}\
</div>');

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
      <p><a title="View Post on Facebook" href="http://facebook.com/{{=item.id}}" target="_blank"><i class="icon-facebook icon-large"></i></a> | \
	<a title="Post Permalink" href="http://chennaigeeks.in/permalink/{{=item.id}}"><i class="icon-link icon-large"></i></a> | \
	{{?item.comments_count}}\
	<a rel="leanModal" name="comments_{{=item.id}}" tabindex="-1" href="#comments_{{=item.id}}" class="comments" postid={{=item.id}}>\
		{{=item.comments_count}}<i class="icon-comment icon-large"></i>\
	</a>\
	<div id="comments_{{=item.id}}" class="commentsModalWindow"><a class="modal_close"></a><div></div></div>\
	</p>{{?}}\
       {{?item.likes_count}} {{=item.likes_count}} <i class="icon-thumbs-up icon-large"></i>{{?}}\
    </div>\
</div>\
{{~}}');

entries_tmpl = doT.template('\
<h4>Recent Posts</h4><hr>\
{{~it :item:index}}\
	<h4><a href="{{=item.link}}">{{=item.title}}</a></h4>\
{{~}}');

comments_tmpl = doT.template('\
<div id="post_outer" class="media">\
  <a class="pull-left" href="#">\
    <img class="media-object" src="http://graph.facebook.com/{{=it.from.id}}/picture" />\
  </a>\
  <div class="media-body">\
    <h4 class="media-heading"><a target="_blank" href="http://facebook.com/{{=it.from.id}}">{{=it.from.name}}</a></h4>\
    {{? it.message}}\
      <p>{{=it.message}}</p>\
    {{?? it.link}}\
      <p><a href="{{=it.link}}">{{=it.link}}</a></p>\
    {{??}}\
      <p>No text/link available</p>\
    {{?}}\
    <div class="media">\
      {{? it.comments.count > 0}}\
        {{~it.comments.data :item:index}}\
        <a class="pull-left" href="#">\
            <img class="media-object" src="http://graph.facebook.com/{{=item.from.id}}/picture">\
        </a>\
        <div class="media-body">\
            <h4 class="media-heading"><a target="_blank" href="http://facebook.com/{{=item.from.id}}">{{=item.from.name}}</a></h4>\
            <p>{{=item.message}}</p>\
        </div>\
        {{~}}\
      {{?}}\
      {{? it.comments.count === 0}}\
        <div class="media-body">\
          <p>No comments found</p>\
        </div>\
      {{?}}\
    </div>\
  </div>\
</div>\
');

bookmarks_tmpl = doT.template('\
{{~it.links :item:index}}\
<div class="media-heading"><a href="{{=item.url}}">{{=item.title}}</a></div>\
{{~}}\
');
