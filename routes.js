var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {
	app.post('/revit-index/:id', async (req, res) => {
		const id = req.params.id;
		// const note = { index: req.body.body, title: req.body.title };
		const details = { 'title': 'to_revit' };
		const messages_array = await db.collection('test-coll').updateOne(details, {$set:{index: id}})
		res.send(messages_array);
		console.log(req.body)
		// console.log(db)
		// res.send('Hello')
	});
	app.post('/test-coll', (req, res) => {
		const note = { index: req.body.body, title: req.body.title };
		db.collection('test-coll').insertOne(note, (err, result) => {
			if (err) { 
			res.send({ 'error': 'An error has occurred' }); 
			} else {
			res.send(result.ops[0]);
			}
		});
		console.log(req.body)
		// console.log(db)
		// res.send('Hello')
	});
	app.get('/get-index', async (req, res) => {
		// const note = { index: req.body.body, title: req.body.title };
		const details = { 'title': 'to_revit' };
		const item = await db.collection('test-coll').findOne(details)
		res.send(item);
		console.log(item)
		// console.log(db)
		// res.send('Hello')
	});
	app.get('/test-coll/:id', (req, res) => {
		const id = req.params.id;
		const details = { '_id': new ObjectID(id) };
		db.collection('test-coll').findOne(details, (err, item) => {
		  if (err) {
			res.send({'error':'An error has occurred'});
		  } else {
			res.send(item);
			console.log(item)
		  } 
		});
	});
	app.get('/get-test', async (req, res) => {
		const id = req.params.id;
		const details = { 'title': 'test' };
		const messages_array = await db.collection('test-coll').find(details).toArray()
		res.send(messages_array);
		console.log('tests count: ' + messages_array.length)
		// db.collection('test-coll').find(details, (err, items) => {
		//   if (err) {
		// 	res.send({'error':'An error has occurred'});
		//   } else {
		// 	res.send('test-coll');
		// 	console.log(items.toArray())
		//   } 
		// });
	});
};

// module.exports = function(app, db) {
// 	app.post('/test-coll', (req, res) => {
// 		const note = { text: req.body.body, title: req.body.title };
// 		db.collection('/test-coll').insert(note, (err, result) => {
// 			if (err) { 
// 			  res.send({ 'error': 'An error has occurred' }); 
// 			} else {
// 			  res.send(result.ops[0]);
// 			}
// 		})
// 		console.log(req.body)
// 		res.send('Hello')
// 	  });
// 	app.get('/test-coll',(req, res) => {
// 		console.log(req.body)
// 		res.send('Hello2')
// 	  });
// //   var DoorService = require('./controller/doors_v1');
// //   app.get('/api/v1/doors', DoorService.findAll);
// //   app.get('/api/v1/doors/:id', DoorService.findById);
// //   //app.post('/api/v1/doors', DoorService.add); // is this used any longer at all, now that update3 is available?
// //   app.post('/api/v1/doors', DoorService.insertBatch); // add multiple records
// //   //app.put('/api/v1/doors/:id', DoorService.update); // this one does not allow me to PUT a new instance only update existing
// //   //app.put('/api/v1/doors/:id', DoorService.update2); // works more like POST + PUT, cf. http://stackoverflow.com/questions/630453/put-vs-post-in-rest
// //   app.put('/api/v1/doors/:id', DoorService.update3); // added {upsert:true} option
// //   app.delete('/api/v1/doors/:id', DoorService.delete);
// //   app.get('/api/v1/doors/project/:pid', DoorService.findAllForProject);
// //   app.get('/api/v1/doors/project/:pid/newer/:mod', DoorService.findAllForProjectModifiedAfter);
// //   app.delete('/api/v1/doors/project/:pid', DoorService.deleteAllForProject);
// }
