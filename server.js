const express        = require('express');
const MongoClient    = require('mongodb').MongoClient;
const bodyParser     = require('body-parser');
// const db             = require('./config/db');
const app            = express();

var localMongo = true;
let client = null;

if(localMongo) {
  // local database
  var mongo_uri = 'mongodb://localhost:27017/test-db';
} else {
  // mongolab hosted
  var mongo_uri = 'mongodb://revit:revit@ds047742.mongolab.com:47742/firerating';
}
port = 3001
app.use(bodyParser.urlencoded({ extended: true }));
// app.set( 'port', process.env.PORT || 3001 );

if (!client) {
	MongoClient.connect(mongo_uri, {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) => {
		if (err) return console.log(err)
		let database = client.db('test-db')
		require('./routes')(app, database);
		app.listen(port, () => {
			console.log('We are live on ' + port);
		// console.log(database);
		});               
	})
}
//   app.use(bodyParser.urlencoded({ extended: true }));
//   MongoClient.connect(db.url, (err, database) => {
// 	if (err) return console.log(err)
// 	require('./app/routes')(app, database);
// 	app.listen(port, () => {
// 	  console.log('We are live on ' + port);
// 	});               
//   })
  
// mongoose.connect( mongo_uri );

// var db = mongoose.connection;
// db.on( 'error', function () {
//   var msg = 'unable to connect to database at ';
//   throw new Error( msg + mongo_uri );
// });

// var app = express();

// var bodyParser = require( 'body-parser' );
// app.use( bodyParser.json({ limit: '1mb' }) );
// app.use( bodyParser.urlencoded({ extended: true, limit: '1mb' }) );

// require( './model/door' );
// require( './routes' )( app );

// app.get( '/', function( request, response ) {
//   response.send( 'Hello from the test-db '
//                 + 'database ' + pkg.version + '.\n' );
// });

// app.set( 'port', process.env.PORT || 3001 );

// var server = app.listen(
//   app.get( 'port' ),
//   function() {
//     console.log( 'Firerating server '
//                 + pkg.version
//                 + ' listening at port '
//                 + server.address().port + ' with '
//                 + (localMongo ? 'locally ' : 'mongolab-')
//                 + 'hosted mongo db.');
//   }
// );
