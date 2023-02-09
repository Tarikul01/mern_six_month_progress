require('dotenv').config();
const app = require('./app');

app.listen(8080, (err) => {
	console.log('Server connection success!');
});
