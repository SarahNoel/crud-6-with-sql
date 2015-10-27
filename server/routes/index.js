var express = require('express');
var router = express.Router();
var path = require('path');
var pg = require('pg');
var connectionString = require(path.join(__dirname, '../', '../', 'server/config'));


router.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', '../', 'client', 'views', 'index.html'));
});


//add new outfit
router.post('/outfits', function(req, res) {

    var results = [];

    // Grab data from http request
    var data = {name: req.body.name, top: req.body.top, bottom: req.body.bottom, shoes: req.body.shoes, accessories: req.body.accessories};

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Insert Data
        client.query("INSERT INTO clothes(name, top, bottom, shoes, accessories) values($1, $2, $3, $4, $5)", [data.name, data.top, data.bottom, data.shoes, data.accessories]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM clothes ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

//get all outfits
router.get('/outfits', function(req, res) {

    var results = [];

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM clothes ORDER BY id ASC;");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

//get one outfit
router.get('/outfit/:id', function(req, res) {

    var outfitId = req.params.id;

    var results = [];
    // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).json({ success: false, data: err});
        }

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM clothes WHERE id=($1);", [outfitId]);

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});


//update one outfit
router.put('/outfit/:id', function(req, res){
  var results =[];

  var id = req.params.id;

  var data = {name: req.body.name, top: req.body.top, bottom: req.body.bottom, shoes: req.body.shoes, accessories: req.body.accessories};

  // Get a Postgres client from the connection pool
    pg.connect(connectionString, function(err, client, done) {
        // Handle connection errors
        if(err) {
          done();
          console.log(err);
          return res.status(500).send(json({ success: false, data: err}));
        }

        // SQL Query > Update Data
        client.query("UPDATE clothes SET name=($1) ,top=($2), bottom=($3), shoes=($4), accessories=($5) WHERE id=($6)", [data.name, data.top, data.bottom, data.shoes, data.accessories, id]);

        // SQL Query > Select Data
        var query = client.query("SELECT * FROM clothes ORDER BY id ASC");

        // Stream results back one row at a time
        query.on('row', function(row) {
            results.push(row);
        });

        // After all data is returned, close connection and return results
        query.on('end', function() {
            done();
            return res.json(results);
        });
    });
});

//delete one outfit
router.delete('/outfit/:id', function(req, res){
  var results = [];

  var id = req.params.id;

  pg.connect(connectionString, function(err, client, done){

    if(err){
      done();
      console.log(err);
      return res.status(500).json({success:false, data:err});
    }

    // SQL Query > Delete Data
    client.query("DELETE FROM clothes WHERE id=($1)", [id]);

    // SQL Query > Select Data
    var query = client.query("SELECT * FROM clothes ORDER BY id ASC");

    // Stream results back one row at a time
    query.on('row', function(row) {
      results.push(row);
    });
    // After all data is returned, close connection and return results
    query.on('end', function() {
      done();
      return res.json(results);
    });
  });
});

























module.exports = router;







// curl --data "name=test&top=test&bottom=test&shoes=test&accessories=test" http://localhost:3000/outfits
//
// curl --data "name=casual&top=tshirt&bottom=jeans&shoes=nikes&accessories=purse" http://localhost:3000/outfits

// curl --data "name=workout&top=hoodie&bottom=sweats&shoes=none&accessories=headband" http://localhost:3000/outfits
//
//
//
//
// curl -X PUT --data "name=update&top=updatetop&bottom=updatebottom&shoes=updateshoes&accessories=none" http://localhost:3000/outfits/2

