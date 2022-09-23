const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const https = require('https')

const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
var items = []
var workItems = []

app.get('/', (req, res) => {
    var today = new Date()
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }

    var day = today.toLocaleDateString("en-US", options)

    res.render('list', {listTitle: day, newListItems: items})
})

app.get('/work', (req, res) => {
    res.render('list', {listTitle: "Work List", newListItems: workItems})
})

app.post('/', (req, res) => {
    var item = req.body.newItem
    if (item !== "") {
        items.push(item)
    }
    else {}
    res.redirect('/')
})

app.post('/work', (req, res) => {
    let item = req.body.newItem
    if (item !== "") {
        workItems.push(item)
    }
    else {}
    res.redirect('/work')
})

app.listen(3500, () => {
    console.log("Server live on port 3500")
})
