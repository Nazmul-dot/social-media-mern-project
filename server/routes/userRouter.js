const express = require('express')
const router = express.Router();
const USER = require('../models/userShcema')
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'nazmul-haq',
    api_key: '766645492229863',
    api_secret: 'Ovx-5LezkfDqt05b31tgLpA_nS0'
})

//for testing
router.get('/test', (req, res) => {
    res.send('hlw test router')
})

//registration
router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, password, conferm_password } = req.body
    try {
        if (!name || !email || !password || !conferm_password) {
            return res.status(422).json({ error1: 'fill all the field' })
        }
        const check = await USER.findOne({ email: email })
        if (check) {
            return res.status(422).json({ error: 'email already exist' })
        } else {
            const docu = new USER({ name, email, password, conferm_password })
            const token = await docu.tokengenaration()
            console.log(token)
            res.cookie('jwtToken', token)
            await docu.save()
            console.log('register sucessfull')
            res.status(201).json(docu)
        }

    } catch (error) {
        return res.status(422).json({ error3: 'registration failed' })
    }
})


//login
router.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(422).json({ error1: 'fill all the field' })
        }
        const userSignin = await USER.findOne({ email: email })
        console.log(userSignin)
        if (userSignin) {
            const ismatch = await bcrypt.compare(password, userSignin.password)
            if (ismatch) {
                const token = await userSignin.tokengenaration()
                console.log(token)
                res.cookie('jwtToken', token)
                console.log("user signin successfully")
                res.json(userSignin)
            } else {
                return res.status(422).json({ error: 'credential......' })
            }
        } else {
            return res.status(422).json({ error: 'credential......' })
        }

    } catch (error) {
        return res.status(422).json({ error3: 'login failed failed' })
    }
})

//set profile pic
router.post('/profilePic', auth, async (req, res) => {
    console.log(req.files.image.tempFilePath)
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
    console.log(result)
    req.user.profilePic = result.secure_url
    const data = await req.user.save()
    res.json(data)
})
//set cover pic
router.post('/coverPic', auth, async (req, res) => {
    console.log(req.files.image.tempFilePath)
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)
    console.log(result)
    req.user.coverPic = result.secure_url
    const data = await req.user.save()
    res.json(data)
})
//all users
router.get('/allUsers', async (req, res) => {
    const result = await USER.find()
    res.json(result)
})

//follwer
router.patch('/follwer/:id', auth, async (req, res) => {

    try {
        const id = req.params.id
        console.log(id)
        const follwUser = await USER.findOne({ _id: id })
        var result1, result2;
        if (!follwUser.follwers.includes(req.user._id)) {
            result1 = await USER.findByIdAndUpdate(id, { $push: { follwers: req.user._id }, number_follwers: follwUser.number_follwers + 1 }, { new: true })
            result2 = await USER.findByIdAndUpdate(req.user._id, { $push: { follwings: follwUser._id }, number_follwings: req.user.number_follwings + 1 }, { new: true })
            // console.log(req.user._id)
            // console.log(result2)
        } else { console.log('alreding folling') }
        res.status(202).json(result1)
    } catch (error) {
        res.status(402).json("follw and follwing failde")
    }
})

//unfollw
router.patch('/unfollwer/:id', auth, async (req, res) => {

    try {
        const id = req.params.id
        const follwUser = await USER.findOne({ _id: id })
        var result1, result2;
        if (follwUser.follwers.includes(req.user._id)) {
            result1 = await follwUser.updateOne({ $pull: { follwers: req.user._id }, number_follwers: follwUser.number_follwers - 1 }, { new: true })
            result2 = await req.user.updateOne({ $pull: { follwings: follwUser._id }, number_follwings: req.user.number_follwings - 1 }, { new: true })
            console.log(req.user._id)
        }
        res.status(202).json("unfollw and unfollwing successfull")
    } catch (error) {
        res.status(402).json("unfollw and unfollwing failde")
    }
})

//all frieds
router.get('/getAllFriend', auth, async (req, res) => {
    try {
        const result = await Promise.all(
            req.user.follwings.map((friendId) => {
                return (
                    USER.findOne({ _id: friendId })
                )
            })
        )
        res.json(result)
    } catch (error) {
        res.json({ message: 'failed to found friends' })
    }

})
//user logged
router.get('/logged', auth, (req, res) => {
    console.log('logged')
    res.json(req.user)
})

//logout
router.get('/logout', auth, async (req, res) => {
    res.clearCookie('jwtToken')
    // req.user.token=[]
    const result = await req.user.save()
    console.log(result)
    res.json(result)
})

module.exports = router