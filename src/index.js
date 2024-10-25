const express = require('express');
const cors = require('cors');
const categoryRoutes = require('./routes/categoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const variantRoutes = require('./routes/variantRoutes');
const pieceRoutes = require('./routes/pieceRoutes');
const requestRoutes = require('./routes/requestRoutes');
const shoppingBagRoutes = require('./routes/shoppingBagRoutes');
const rfidRoutes = require('./routes/rfidRoutes');

const app = express();
const port = 8080;

app.use(cors({
    origin: ['http://localhost:3000','http://192.168.8.122:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/api/categories', categoryRoutes);
app.use('/api/Items', itemRoutes);
app.use('/api/variants', variantRoutes);
app.use('/api/pieces', pieceRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/shoppingBags', shoppingBagRoutes);
app.use('/api/rfid', rfidRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the FashTech Backend! This is a temporary route for testing.');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server is running at http://localhost:${port}`);
});
