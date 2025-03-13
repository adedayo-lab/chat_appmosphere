import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('MongoDB connected successfully @ connectToMongoDB');
    } catch (error) {
        console.error(`Error connecting to mongoDB_Atlas, check internet connection or ===> ${error.message}`);
    }
};

export default connectToMongoDB;