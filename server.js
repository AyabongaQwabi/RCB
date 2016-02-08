/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

var fs = require('fs');
var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql')
var myConnection = require('express-myconnection')
var databaseOptions = {
    user:'root',
    host:'localhost',
    password:'theaya5379',
    database:'rcb',
    port:3306
}
var app = express();
var consMade=0;
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', (process.env.PORT || 3000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(myConnection(mysql,databaseOptions))

// Additional middleware which will set headers that we need on each request.
app.use(function(req, res, next) {
    // Set permissive CORS header - this allows this server to be used only as
    // an API server in conjunction with something like webpack-dev-server.
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Disable caching so we'll always get the latest comments.
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

app.get('/api/comments', function(req, res) {
  
      var connection = mysql.createConnection(databaseOptions)
      connection.query('select  comments.id,comments.comment,users.name,users.tagline ,users.img from comments,users where comments.user_id =users.id',function(err,data){
          if(err)console.log('ERR:\t'+err)
          //console.log(data)
          res.json(data);
      })
      connection.end();
  /*
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });*/
});

app.post('/api/comments', function(req, res) {
    console.log('new comment')
  var newComment = {
      user_id:0,
      comment: req.body.comment
    };
  var newUser={
     name:req.body.author
  }
  var connection = mysql.createConnection(databaseOptions)
  connection.query('insert into users set ?',newUser,function(err,data){
          if(err)console.log('ERR:\t'+err)
          console.log('user inserted first')
          connection.query('select id from users where name = ?',req.body.author,function(err,data){
             if(err)console.log('ERR:\t'+err)
              console.log('then comment')
              newComment.user_id =data[0].id
              console.log(newComment)
              connection.query('insert into comments set ?',newComment,function(err,data){

                    if(err)console.log('ERR:\t'+err)
                    console.log('Done Everything')
                    connection.query('select  comments.id,comments.comment,users.name,users.tagline ,users.img from comments,users where comments.user_id =users.id',function(err,data){
                      if(err)console.log('ERR:\t'+err)
                      //console.log(data)
                      res.json(data);
                      connection.end();
                  })
              })
          })
  })
     
          

  /*fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });*/
});
app.get('/join',function(req,res){
    res.sendFile('/signup.html')
})
app.get('/signup',function(req,res){
    var story = {story:"With our new systems you enjoy the comfort of coding from home "}
    res.json(story)
})
app.post('/signup',function(){
    var details = req.body;
    var connection = mysql.createConnection(mysql,databaseOptions)
    connection.query('insert into users set ?',details,function(err,results){
        if(err)console.log(err)
        console.log('Done')
    })

})
app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
