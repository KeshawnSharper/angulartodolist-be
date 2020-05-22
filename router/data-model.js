const db = require('../data/dbConfig');

function getUsers() {
  return db("users")
}
function register(user){
  return db("users").insert(user)
  }
  function login(user)
 { 
     return db("users").where({"email":user.email})
 }
 function todo(user_id)
 { 
     return db("todo").where({"user_id":user_id})
 }
 function todos(id)
 { 
     return db("todo").where({"id":id})
 }
 function add_Todo(data) {
  return db("todo").insert(data).then(id =>todos(...id));
   
}
function delete_Todo(id) {
  return db("todo").where({"id":id}).delete()
   
}


module.exports = {
    register,
    login,
    getUsers,
    add_Todo,
    todo,
    todos,
    delete_Todo
}
   