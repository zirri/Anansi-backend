const fs = require('fs');

function getBooks(){
    let booksJson = fs.readFileSync('./src/books.json');
    let books = JSON.parse(booksJson);
    return books;
}

function findBook(books, bookId){
    return books.filter(item => item.bookId ===bookId);
}

function booksToSwipe(user){
    const books = getBooks();
    const booksToSwipe = books.filter(item => {
        if (user['favoriteBooks'].indexOf(item.bookId)>-1){    
            return false
        } 
        if (user.readBooks.indexOf(item.bookId)>-1){
            return false
        } 
        if (user.rejectedBooks.indexOf(item.bookId)>-1){
            return false
        } 
        return true;
    });
    const bookIdsToSwipe = booksToSwipe.map(item => item.bookId)
    return bookIdsToSwipe
}

function randomBookId(bookArray){
    return Math.floor(bookArray.length*Math.random());
}

function addBookTo(user, action, bookId){
    switch (action){
        case 'read':
            user.readBooks.push(bookId)
            break;
        case 'reject':
            user.rejectedBooks.push(bookId)
            break;        
        case 'favorite':
            user.favoriteBooks.push(bookId)
            break;
        default: 
            throw new Error('Invalid action')
    }
}

module.exports = {
    getBooks,
    findBook,
    booksToSwipe,
    randomBookId,
    addBookTo
}