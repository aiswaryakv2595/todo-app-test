import mongoose from "mongoose"
const validateMongoDbid = (id) =>{
    const isVaid = mongoose.Types.ObjectId.isValid(id)
    if(!isVaid) throw new Error('this id is not valid')
}

export default validateMongoDbid