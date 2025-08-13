const User = require('../models/userModel')
const mongoose = require('mongoose')

// get all profiles
const getProfiles = async (req, res) => {
    const users = await User.find({}).sort({createdAt : -1})
    res.status(200).json(users)
}
// get a single profile
const getUser = async(req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such Profile!'})
    }

    const user = await User.findById(id)

    if(!user){
        return res.status(404).json({error: 'no such profile'})
    }
    res.status(200).json(user)
}

//create new profile
const createProfile = async (req, res) => {
    const{name, pNumber, rNumber} = req.body
    // add doc to db
    try{
        const user = await User.create({name, pNumber, rNumber})
        res.status(200).json(user)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}
//delete profile
const deleteUser = async(req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such Profile!'})
    }
    const user = await User.findOneAndDelete({_id: id})
    
    if(!user){
        return res.status(400).json({error: 'no such profile'})
    }

    res.status(200).json(user)


}

//Update profile
const updateUser = async (req, res) => {
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error: 'No such Profile!'})
    }
    const user = await User.findOneAndUpdate({_id: id},{
        ...req.body
    })
    
    if(!user){
        return res.status(400).json({error: 'no such profile'})
    }
    res.status(200).json(user)
}


module.exports = {
    getProfiles,
    getUser,
    createProfile,
    deleteUser,
    updateUser

}