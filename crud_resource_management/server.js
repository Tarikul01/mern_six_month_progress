require('dotenv').config();
const app = require('./app');

app.listen(5000, (err) => {
	console.log('Server connection success!');
});
