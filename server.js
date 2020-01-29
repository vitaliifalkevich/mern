const express = require('express');
const connectDB = require('./config/db');


const app = express();
/**/
connectDB();

//Init Middleware

app.use(express.json({extended: false}));

app.get('/', (req, res)=> res.send('API Running!'));

//Define routers
app.use('/api/employees', require('./routes/api/employees'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/signup', require('./routes/api/signUp'));
app.use('/api/search', require('./routes/api/search'));


const  PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));