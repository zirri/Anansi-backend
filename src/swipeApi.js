const express = require('express');
const router = express.Router();
const booksFn = require('./bookFunctions');
const usersFn = require('./userFunctions');
const fs = require('fs');

const books = booksFn.getBooks();
const validActions = ['favorite', 'read', 'reject'];
const saveToFile = (filename, object)=>{
    fs.writeFileSync(filename, JSON.stringify(object,null,2));
    console.log("Object saved to file")
}

//Defining middleware
router.use('/user/:userId',(req, res, next) => {
    const userId = parseInt(req.params.userId);
    const users = usersFn.getUsers();
    if (!userId){
        return next('Invaild format user ID');
    }
    if(!usersFn.getUserData(users, userId)){
        return next('Could not find user');
    }
    next();
})

router.post('/user/:userId',(req, res, next) => {
    const action = req.body.action;
    const bookId = parseInt(req.body.bookId);
    if(!bookId){
        return next('BookId not a number');
    }
    if(booksFn.findBook(books, bookId).length === 0){
        return next('Invalid bookId');
    }
    if(typeof action !== 'string'){
        return next('action not a string');
    }
    if(validActions.indexOf(action)===-1){
        return next('Invalid action');
    }
    next();
})

//routes
router.get('/user/:userId',(req, res) => {
    const userId = parseInt(req.params.userId);
    const users = usersFn.getUsers();
    const user = usersFn.getUserData(users, userId)[0];
    const booksToSwipe = booksFn.booksToSwipe(user);
    const nextIndex = booksFn.randomBookId(booksToSwipe);
    const bookIdToReturn = booksToSwipe[nextIndex];
    const bookToReturn = findBook(books, bookIdToReturn);
    res.json(bookToReturn[0]);
})

// GET Favorites (for later)
// router.get('/user/:userId',(req, res) => {
//     const userId = parseInt(req.params.userId);
//     const user = usersFn.getUserData(userId);
//     // 1. Get favourites array from user
//     // 2. Get array of objects with bookId in favorites from books.json
//     // 3. Return array of book objects

//     res.json(user.favorites);
// })

router.post('/user/:userId',(req, res,next) => {
    const userId = parseInt(req.params.userId);
    const users = usersFn.getUsers();
    const user = usersFn.getUserData(users,userId)[0];
    const userIndex = usersFn.getUserData(users, userId)[1];
    const action = req.body.action;
    const bookId = parseInt(req.body.bookId);
    try{
        booksFn.addBookTo(user, action, bookId);
    }catch(error){
        next(error)
    }
    users[userIndex] = user;
    saveToFile('./src/users.json',users)
    res.json();
})


router.use('/',(err, req,res,next)=>{
    console.log(err);
    res.sendStatus(404)
})

module.exports = router;