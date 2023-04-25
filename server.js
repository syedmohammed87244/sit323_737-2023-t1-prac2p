const { json } = require('express');
const express = require('express'); 
const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
 


// List of users
let users = [ 
  { id: 1, name: 'Mohammed' }, 
  { id: 2, name: 'Shariq' }, 
  { id: 3, name: 'Jaleel' }
]; 


// Home page request
// curl http://localhost:3000/
app.get('/', (req, res) => {        
  res.send("Welcome to our server!!");
}); 

// Get all users in the array
// curl http://localhost:3000/users
app.get('/users', (req, res) => { 
  console.log("Displaying all users");
  res.json(users); 
}); 


// Get a user of a specified ID
// curl http://localhost:3000/users/-id-
app.get('/users/:id', function(req, res) {
    console.log("User ID " + req.params.id + " requested");
    var userID = req.params.id;
    var userFound = false;

    users.forEach((user, index, array) => {
        if (user.id == userID) {
            res.send(users[index]);
            userFound = true;
        }
    });

    if (userFound == false) {
        res.send("ERROR: User with ID " + userID + " does not exist");
    }
});


// Post a new user
// curl -X POST -H "Content-Type: application/json" -d "{\"id\": 4, \"name\": \"John\"}" http://localhost:3000/users
app.post('/users', (req, res) => {
  if (req.body === undefined) {
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 
 

// Update a user via an existing ID
// curl -X PUT -H "Content-Type: application/json" -d "{\"id\":1,\"name\":\"Mark\"}" http://localhost:3000/users/1
app.put('/users/:id', (req, res) => { 
  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);
  const updatedUser = req.body; 
  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

// Delete a user via an existing ID
// curl -X DELETE http://localhost:3000/users/3
app.delete('/users/:id', (req, res) => { 
  const userId = parseInt(req.params.id);
  console.log("User deleated with ID: " + req.params.id);
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

app.listen(3000, () => { 
  console.log('Server is listening on port 3000'); 
}); 
