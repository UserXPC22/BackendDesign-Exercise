const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');


const app = express();
const PORT = 3000;


app.use(bodyParser.json());

app.use('/user', userRoutes);

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});



