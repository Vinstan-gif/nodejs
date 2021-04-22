const http = require('http');
var url = require('url');
var MongoClient = require('mongodb').MongoClient;
var url1 = "mongodb://localhost:27017/";
const server = http.createServer((req,res)=>{
const q = url.parse(req.url, true);
    
    if(req.url === '/'){
        res.write('Welcome');
        res.end();
    }
    
    if('/create' === q.pathname && req.method == 'GET'){
        res.writeHead(200, {'Content-Type': 'text/html'});
        
        var txt
        var qdata = q.query;
        

        MongoClient.connect(url1, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb1");
            var myobj = { firstname: qdata.firstname, lastname: qdata.lastname };
            dbo.collection("customers").insertOne(myobj, function(err, resul) {
                if (err) throw err;
                console.log("1 document inserted");
                db.close();
            });
            
        });
        txt = "Account created for " + qdata.firstname + " " + qdata.lastname;
        res.end(txt);        
    }
    
    if('/read' === q.pathname && req.method == 'POST'){
        
        let qdata = q.query;
        var txt;
        MongoClient.connect(url1,(err, db) => {
            if (err) throw err;
            let dbo = db.db("mydb1");
            let myobj = {firstname: qdata.firstname}
            dbo.collection("customers").findOne(myobj,(err, result) => {
                if (err) throw err;
                console.log(result.firstname, result.lastname);
                txt= "Account found for " + result.firstname + " " + result.lastname;
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.end(txt);
                db.close();
            });    
        });
        
    }

    if('/update' === q.pathname && req.method == 'POST'){
        let qdata = q.query;
        var txt;
        MongoClient.connect(url1, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb1");
            var myquery = { firstname: qdata.firstname };
            var newvalues = { $set: {firstname: qdata.newfirstname, lastname: qdata.newlastname} };
            dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
              if (err) throw err;
              console.log("1 document updated");
              db.close();
            });
        });
        txt = "Account updated for "+qdata.firstname+" to " + qdata.newfirstname + " " + qdata.newlastname;
        res.end(txt); 
    }
    if('/delete' === q.pathname && req.method == 'POST'){
        let qdata = q.query;
        var txt;
        MongoClient.connect(url1, function(err, db) {
            if (err) throw err;
            var dbo = db.db("mydb1");
            var myquery = { firstname: qdata.firstname};
            dbo.collection("customers").deleteOne(myquery, function(err, obj) {
              if (err) throw err;
              console.log("1 document deleted");
              db.close();
            });
        });
        txt = "Account deleted for " + qdata.firstname;
        res.end(txt); 
    }    

}).listen(8000);