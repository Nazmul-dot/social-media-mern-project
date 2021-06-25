const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
    {
        author:{
            type:String
        },
        text: {
            type: String,
        },
        postImage: {
            type: String,
        },
        comments: {
            type: [
                {
                    commenterName: String,
                    commentorId:String,
                    commentText: String,
                    timestamp: Number
                }
            ]
        },
        number_comments: {
            type: Number,
            default: 0
        },
        likes: {
            type: Array,
            default: []
        },
        number_likes: {
            type: Number,
            default: 0
        },
        creatorId: {
            type: String,
        },


    },
    {timestamps:true}
)

const POST = new mongoose.model('post', postSchema)
module.exports = POST