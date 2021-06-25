const express = require('express')
const auth = require('../middleware/auth')
const router = express.Router()
const POST = require('../models/postSchema')
const USER=require('../models/userShcema')
const cloudinary = require('cloudinary').v2

cloudinary.config({
    cloud_name: 'nazmul-haq',
    api_key: '766645492229863',
    api_secret: 'Ovx-5LezkfDqt05b31tgLpA_nS0'
})
// const { creator, title, message, tag } = req.body
// const result = await cloudinary.uploader.upload(req.files.image.tempFilePath)

// all post
router.get('/allpost',auth, async (req, res) => {
    console.log(req.user)
    // const result = await POST.find(req.user_id);
  
    // const creatorId=req.user._id
    const result = await POST.find({creatorId:req.user._id})
    console.log(result)
    res.json(result)
})
// create post 
router.post('/createPost',auth, async (req, res) => {
    console.log(req.body)
    console.log(req.files)
    try {
        const { text } = req.body
        var result;
        if (!req.files) {
            result = new POST({ text: text,author:req.user.name, creatorId: req.user._id })
            await result.save()
        } else {
            const imgdata = await cloudinary.uploader.upload(req.files.image.tempFilePath)
            result = new POST({ text: text,author:req.user.name,creatorId: req.user._id, postImage: imgdata.secure_url })
            await result.save()
        }
        res.json(result)
        console.log(result)
    } catch (error) {

    }
})

//update post
router.patch('/updatePost/:id', auth, async (req, res) => {
    // console.log(req.body)
    // console.log(req.files)
    const id = req.params.id;
    try {
        const { text } = req.body
        var result;
        if (!req.files) {
            result = await POST.findByIdAndUpdate(id, req.body, { new: true })
        } else {
            const imgdata = await cloudinary.uploader.upload(req.files.image.tempFilePath)
            result = await POST.findByIdAndUpdate(id, { text: text, creatorId: req.user._id, postImage: imgdata.secure_url }, { new: true })
        }
        res.json(result)
    } catch (error) {
        res.json({ message: 'faile to update' })
    }

})

//post delete
router.delete('/postDelete/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const result = await POST.findByIdAndDelete(id);
        res.json(result)
    } catch (error) {
        res.json({ message: 'faile to delete' })
    }
})

//post like
router.patch('/like/:id', auth, async (req, res) => {
    const id = req.params.id;
    try {
        var result;
        const likePost = await POST.findOne({ _id: id })
        if (!likePost.likes.includes(req.user._id)) {
            result = await likePost.updateOne({ $push: { likes: req.user._id }, number_likes: likePost.number_likes + 1 },{new:true})
        } else {
            result = await likePost.updateOne({ $pull: { likes: req.user._id }, number_likes: likePost.number_likes - 1 },{new:true})
        }
        console.log(result)
        res.json(likePost)
    } catch (error) {
        res.json({ message: error })
    }
})

// add comment
router.patch('/addComment/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log(id)
    try {
        const commentPost = await POST.findOne({ _id: id })
        const result = await POST.findByIdAndUpdate(id, {
            $push: {
                comments: {
                    
                    commentorId: req.user._id,
                    commentText: req.body.text,
                    timestamp: new Date(),
                    commenterName:req.user.name,
                }
            }, number_comments: commentPost.number_comments + 1
        }, { new: true })
        res.json(result)
        console.log(result)
    } catch (error) {
        res.json({ message: error })
    }
})
//delete comment
router.patch('/deleteComment/:id', auth, async (req, res) => {
    const id = req.params.id;
    const commentPost = await POST.findOne({ _id: id })
    try {
        const result = await POST.findByIdAndUpdate(id,
            {
                $pull: { comments: { _id: req.body.commentId } }, number_comments: commentPost.number_comments - 1
            }, { new: true })

        res.json(result)
    } catch (error) {
        res.json({ message: error })
    }
})
//update comment
router.patch('/updateComment/:id', auth, async (req, res) => {
    const id = req.params.id;
    const { commentId, text } = req.body
    console.log(commentId)
    console.log(req.body)
    const commentPost = await POST.findOne({ _id: id })
    const theComment = commentPost.comments.find((comment) => comment._id.toString() === commentId.toString() ? comment : '')
    theComment.commentText = text
    const result = await commentPost.save()
    console.log(result)
    res.json(result)

})

// all timeline post
router.get('/timelinePost',auth,async(req,res)=>{
    console.log('timeline')
    const userPost=await POST.find({creatorId:req.user._id})
    const friendPost=await Promise.all(
        req.user.follwings.map((friendId)=>{
            return POST.find({creatorId:friendId})
        })
    )
    res.json(userPost.concat(...friendPost))
})
// user's all post
router.post('/userPost/:id',auth,async(req,res)=>{
    console.log('userPost')
    const id=req.params.id;
    const result=await POST.find({creatorId:id})
    res.json(result)
})
// current user profile details
router.post('/currectUser/:id',auth,async(req,res)=>{
    const result=await USER.findOne({_id:req.params.id})
    res.json(result)
    // console.log(result)
})
module.exports = router