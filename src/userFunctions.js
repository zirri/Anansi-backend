const fs = require('fs');

function validateUser(user){
    return true
}

function getUsers(){
    let usersJson = fs.readFileSync('./src/users.json');
    let users = JSON.parse(usersJson);
    return users
}


function getUserData(users, userId){
    let user = users.filter(item => {
        return item.userId === userId;
    });
    let userIndex = users.indexOf(user);
    if(user.length === 0){
        return false;
    }
    return [user[0],userIndex];
}

module.exports = {
    validateUser,
    getUsers,
    getUserData
}