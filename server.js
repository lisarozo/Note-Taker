const express = require('express');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const dbjson = require('./db/db.json')
const app = express();
const PORT = process.env.PORT || 3001;
const fs = require('fs');
app.use(express.json())
app.use(express.urlencoded( { extended: true }));
app.use(express.static('public'));


app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname,'./public/notes.html'));
});

app.listen(PORT, () => console.log(`listening on PORT: ${PORT}`));


app.get('/', (req, res) => {
   res.sendFile(path.join(__dirname, 'index.html'));
 });

app.get('/notes', (req, res) => {
   res.sendFile(path.join(__dirname, 'notes.html'));
 });
 
 app.get('/api/notes', (req, res) => {
   return res.json(dbjson);
 });

 app.post('/api/notes', (req, res) => {
    const {title, text} = req.body
   
   if (!title) {
      return res.json({error: 'needs title'});
    }
    if (!text) {
      return res.json({error: 'needs text'});
    }
    const notes = {
      title,
      text,
      id: uuidv4()
    };
   dbjson.push(notes)
   console.log(dbjson)
    fs.writeFile("db/db.json", JSON.stringify(dbjson), function(err) {
        if (err) {
            console.log(err);
        }
    });
 });

 