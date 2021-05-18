const express = require('express');
const mongoose = require('mongoose');
const Book = require('./model');
const app = express();
 

app.use(express.json());  //req.body


const uri = "mongodb://localhost:27017/";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB database connected");
});


// Inserting the records into Database
app.post('/', async (req, res)=>{
    try {
        const {title, author} = req.body;
        const book = new Book({
            title,
            author
        });

        const result = await book.save();
        // console.log('Newly created book ID is: ',result._id);
        res.json('Successfully Added');

    } catch (err) {
        console.error(err.message);
    }
});


//Getting records using id

app.get('/:id', async(req, res)=>{
    try {
        
        const book = await Book.findById(req.params.id );
        if(!book){
            return res.status(404).send({message: "User not found"});
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
    }
});




app.listen(5000, ()=>console.log('Server has started at port: 5000'));