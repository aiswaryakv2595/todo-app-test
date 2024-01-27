import mongoose from "mongoose";
const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log('database successfully connected');
    } catch (error) {
        console.log('database error')
    }
}
export default dbConnect