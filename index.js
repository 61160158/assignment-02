const MongoClient = require('mongodb').MongoClient
const express = require('express')
const app = express()

app.use(express.json())
let books = []

const url = 'mongodb+srv://superadmin:123456123@cluster0.uhmzt.mongodb.net/book?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })
let db,booksCollection

async function connect() {
    await client.connect()
    db = client.db('book')
    booksCollection = db.collection('books')
}
connect()

app.get('/books/:id', async (req, res) => {
    let id = req.params.id

    res.status(200).json(books[id])
})

app.post('/books', async (req, res) => {
    let newTitle = req.body.title
    let newPrice = req.body.price
    let newUnit = req.body.unit
    let newIsbn = req.body.isbn
    let newImage = req.body.image_url


    let newBook = {
        title: newTitle,
        price: newPrice,
        unit: newUnit,
        isbn: newIsbn,
        image_url: newImage
    }
    let bookID = 0

    const result = await booksCollection.insertOne(newBook)
    bookID = result.insertedId

    // books.push(newBook)
    // bookID = books.length-1

    res.status(201).json(bookID)
})

const port = 3000
app.listen(port, () => console.log(`Server started at ${port}`))