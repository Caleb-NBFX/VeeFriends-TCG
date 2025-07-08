
const mongoose = require('mongoose');
const Card = require('./models/Card');
const cardData = require('./veefriends_cards_metadata.json');

mongoose.connect('mongodb+srv://calebc:DFDdW7AMn2DCwfs4@cluster0.h6zqc9k.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
    return Card.deleteMany({});
}).then(() => {
    return Card.insertMany(cardData);
}).then(() => {
    console.log('Database seeded successfully');
    mongoose.disconnect();
}).catch(err => {
    console.error('Failed to seed database', err);
    mongoose.disconnect();
});
