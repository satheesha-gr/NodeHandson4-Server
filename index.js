const express = require('express');
const app = express();
const route = require("./router/userRouter")

app.use(express.json());

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv')
dotenv.config()

app.use('/user', route)

const port = process.env.PORT || 4040

app.listen(port, ()=>{
    try {
        console.log(`Server is listening at http://localhost:${port}`)
    }
    catch(err) {
        console.log('Error');
    }
})