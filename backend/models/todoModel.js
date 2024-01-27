import mongoose from "mongoose";

// Declare the Schema of the Mongo model
var todoSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    status:{
        type:Boolean,
        default:false
    }
});

//Export the model
export default mongoose.model('Todo', todoSchema);