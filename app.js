/*eslint-disable semi */
const express = require('express')
const app = express()

const Datastore = require('@google-cloud/datastore');
const ds = Datastore({
 projectId: "building-apps-gcp-214015" // Replace with your project id
})

// Datastore "table name"
const kind = 'Fortune'

// Construct GQL Query, doesnt run it yet
const q = ds.createQuery([kind]).select(["Text"])

// "Cache" of fortunes
var fortunes = []

app.get('/', (req, res) => {
    res.sendFile('index.html', {root: __dirname })
})

app.get("/fortune", (req, res) => {

	if (fortunes.length === 0) {

		// Entities contains results from the query
		ds.runQuery(q, (err, entities, nextQuery) => {
		
			entities.forEach(ent => {
				console.log(ent)
				fortunes.push(ent.Text)
			})
			
			res.send(fortunes[Math.floor(Math.random() * 12)])

		})

 	} else {
 		res.send(fortunes[Math.floor(Math.random() * 12)])
 	}

})

app.listen(8080, console.log('Example app listening on port 8080!'))