var prototype = {};
prototype.string = {};

prototype.string.autolink = function (string, options){
    if(!options) options = {};
    if(!options.limit) options.limit = 140;
    if(!options.tagFill) options.tagFill = '';
    
    var regex = /((http\:\/\/|https\:\/\/|ftp\:\/\/)| (www\.))+(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi;
    
    string = string.replace(regex, function(value){
        value = value.toLowerCase();
        var m = value.match(/^([a-z]+:\/\/)/);
        var nice;
        var url;
        
        if(m)
        {
            nice = value.replace(m[1],'');
            url = value;
        }
        else
        {
            nice = value;
            url = 'http://' + nice;
        }
        
        return '<a href="' + url + '"' + (options.tagFill != '' ? (' ' + options.tagFill) : '')+ '>' + prototype.string.autolinkLabel(nice, options.limit) + '</a>';
    });
    
    return string;
};


prototype.string.autolinkLabel = function (text, limit){

    if (!limit){ return text; }

    if (text.length > limit){
        return text.substr(0, limit - 3) + '...';
    }

    return text;
};

 function handleComments(){
                        $('.comments').each(function(){
                                $(this).click(function(e){
                                        e.preventDefault();
                                        var post_id = $(this).attr('postid');
                                        $.getJSON('https://graph.facebook.com/'+post_id+'?format=json&callback=?', {
                                                access_token: '143111822497501%7C7QGy_pxMyF1_dUzT75Jv6udDyjk'
                                        }, function(data){
                                                if(data.comments.count > 0){
                                                         $.getJSON('https://graph.facebook.com/'+post_id+'/comments?format=json&callback=?', {
                                                                access_token: '143111822497501%7C7QGy_pxMyF1_dUzT75Jv6udDyjk',
                                                                limit: 200
                                                        }, function(comments_data){
                                                                $.each(comments_data.data, function(index, value){value.message = prototype.string.autolink(value.message);});
                                                                data.comments.data = comments_data.data;
							    displayComments(data, post_id);
                                                        });
                                                }
					     else{
						displayComments(data, post_id);
					     }
                                        });	
                                });
                        });
                }

function displayComments(data, post_id)
{
	$('#comments_'+post_id+' > div').html(comments_tmpl(data));
}




