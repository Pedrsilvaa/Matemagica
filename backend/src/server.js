
const { API_PORT } = require('./config/variables');
const app = require('./app');

app.listen(API_PORT, (error) => {
    if(error) {
        console.error('server not started');
        return error;
    }
    console.log(`
        server started on port ${API_PORT}
    `);
});
