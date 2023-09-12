import mongoose from "mongoose";

const mongoURI = 'mongodb://127.0.0.1:27017/bloggerapp'
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, })

const db = mongoose.connection;
db.on('error', (err) => {
    console.error('MongoDB connection error:', err)
});
db.once('open', () => {
    console.log('Connected to MongoDB');
})

export default mongoose;




