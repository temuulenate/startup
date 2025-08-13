const express = require('express')
const {
    createProfile,
    getProfiles,
    getUser,
    deleteUser,
    updateUser
    
    } = require('../controllers/userController')

const router = express.Router()
// get all profiles 
router.get('/', getProfiles)

// get a single profile
router.get('/:id', getUser)

// post a new profile
router.post('/', createProfile)

// delete a profile
router.delete('/:id', deleteUser)

// update a single profile
router.patch('/:id', updateUser)

module.exports = router