var connect = require('connect');
var serveStatic = require('serve-static');
connect().use(serveStatic(__dirname + '/code')).listen(process.env.PORT || 8080, function(){
    console.log('Server running on %s..', process.env.PORT || 8080);
});