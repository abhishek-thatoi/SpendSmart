
const express = require('express')
const cors = require('cors');
const {readdirSync}=require('fs')
const db = require('./database/db').default;//if deafault is not given
//db is undefined //error: db is not a function

const app = express()
require('dotenv').config();
const PORT= process.env.PORT;



// *MIDDLEWARE

app.use(express.json());

app.use(cors());//cors stands for Cross-Origin Resource Sharing.
                //so that cross domain request and response can be made available to our Express applicaton


// *ROUTES
// Dynamically load route handlers from files in the ./routes directory. 
readdirSync('./routes').map((route)=>app.use('/api/v1',require('./routes/'+route)))
                                              //dynmc api                 //dynamic route path  

//'/api/v1':Prefix all these routes with /api/v1, making them accessible under a versioned API endpoint.

//versioned Api:
// suppose version /api/v1/ is the current working version
// so we make another /api/v2 for development and testing instead of altering the version in use



const server=()=>{

    db()
    app.listen(PORT,()=>{
        console.log('server is working at:',PORT);
    })
}
server()