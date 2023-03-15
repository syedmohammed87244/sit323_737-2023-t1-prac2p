// We will use Express, a Node.js web application framework, to host
// a localhost server for us. With this server backend we can receive
// and respond to requests.
// 
// https://expressjs.com/


// To begin, we need:
// 1. VS Code installed
// 2. Node.js installed
// Create a folder where your project will be, and Open Folder in VS Code
//
// Create our server.js file
// Install Express via the NPM (node package manager) via the terminal with:
// npm install express
//
// To run our server, in the terminal we say:
// node server.js






const { json } = require('express');
const express = require('express'); 
const app = express(); 


// Need to import Express libraries to read POST body data (e.g. req.body)
app.use(express.json());             
app.use(express.urlencoded());       



// Curl is a command-line tool for sending HTTP requests to a server
// and receiving its responses. It is commonly used to test RESTful APIs
// as it allows you to simulate HTTP methods: GET, POST, PUT, PATCH and
// DELETE. 
//
// Curl comes pre-installed on unix-based OS (Mac OS, Linux). It can be
// installed on Windows also.
//
// https://gist.github.com/subfuzion/08c5d85437d5d4f00e58

// Postman is an excellent alternative to Curl. Some good tutorials:
// https://learning.postman.com/docs/introduction/overview/
// https://www.guru99.com/postman-tutorial.html 



// A note on troubleshooting.
// Be mindful of where your error is occuring exactly. For example, is it
// a Javascript issue, a NodeJS issues, or Curl issue, or an Express isssue?
//
// Googling an error for Express, when it is actually a Javascript issue,
// is not going to get you good search outcomes.





// Our users
let users = [ 
  { id: 1, name: 'John' }, 
  { id: 2, name: 'Jane' }, 
  { id: 30, name: 'Bob' }
]; 


// Home page request
// curl http://localhost:3000/
app.get('/', (req, res) => { 
  res.send("Welcome to our server");
}); 

 
// Get all users in the array
// curl http://localhost:3000/users
app.get('/users', (req, res) => { 
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
// curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"id":4,"name":"emma"}'
app.post('/users', (req, res) => {

  if (req.body === undefined) {
    // Invalid data received (likely not in JSON format)
    console.log("ERROR: req.body is undefined");
    res.status(400).send("ERROR: req.body is undefined");
  } 
  else {
    // Decode the JSON into a string for readability with Stringify()
    userData = JSON.stringify(req.body);
    console.log("Adding new user with data: " + userData);

    // Store JSON directly into our array
    const newUser = req.body; 
    users.push(newUser); 
    res.status(201).json(newUser); 
  }
  
}); 

 

// Update a user via an existing ID
// curl -X PUT http://localhost:3000/users/-id- -H "Content-Type: application/json" -d '{"id":55,"name":"doona"}'
app.put('/users/:id', (req, res) => { 

  // Retrieve the user ID from the parameters (params) named 'id' in the URL
  const userId = parseInt(req.params.id); 
  console.log("Update user with ID: " + req.params.id);

  // Retrieve the PUT data (with the -d flag in Curl) of the user data
  const updatedUser = req.body; 

  // Update a user (if the ID exists)
  users = users.map(user => user.id === userId ? updatedUser : user); 
  res.status(200).json(updatedUser); 
}); 

 

// Delete a user via an existing ID
// curl -X DELETE http://localhost:3000/users/-id-
app.delete('/users/:id', (req, res) => { 
  // Retrieve the user ID from the parameters (params) named 'id' in the URL 
  const userId = parseInt(req.params.id);

  // Remove the user (if the ID exists)
  users = users.filter(user => user.id !== userId); 
  res.status(204).send(); 
}); 

 

app.listen(3000, () => { 
  console.log('Server is listening on port 3000'); 
}); 