import { Schema, model } from 'mongoose'

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    tweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet',
        },
    ],
})

export default model('User', userSchema)
