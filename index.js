const http=require('http')

http.createServer(function(req,res){
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end(JSON.stringify({userName:'Hello World!'}));

}).listen(3389)

console.log("NodeJs Server Running");
