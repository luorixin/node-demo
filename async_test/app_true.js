var cheerio = require("cheerio");
var async = require("async");
var superagent = require("superagent");

var url = require("url");

var cocurrent = 0
var fetchUrl = function(url,callback){
	cocurrent++;
	console.log('现在的并发数是', cocurrent, '，正在抓取的是', url);
  	superagent.get(url)
	    .end(function (err, res) {
	      cocurrent--;
	      var $ = cheerio.load(res.text);
  		  callback(null,url+ "\n"+$('.topic_full_title').text().replace("\s",""));
	    });
}
var cnodeUrl = 'https://cnodejs.org/';
superagent.get(cnodeUrl)
	.end(function(err,res){
		if (err) {
	      return console.error(err);
	    }
	    var topicUrls = [];
	    var $ = cheerio.load(res.text);
	    // 获取首页所有的链接
	    $('#topic_list .topic_title').each(function (idx, element) {
	      var $element = $(element);
	      // $element.attr('href') 本来的样子是 /topic/542acd7d5d28233425538b04
	      // 我们用 url.resolve 来自动推断出完整 url，变成
	      // https://cnodejs.org/topic/542acd7d5d28233425538b04 的形式
	      // 具体请看 http://nodejs.org/api/url.html#url_url_resolve_from_to 的示例
	      var href = url.resolve(cnodeUrl, $element.attr('href'));
	      topicUrls.push(href);
	    });

	    async.mapLimit(topicUrls,5,fetchUrl,function(err,res){
	    	console.log("final:\n\r"+res)
	    })
	})