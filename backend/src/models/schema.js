import mongoose from 'mongoose';
const Schema = mongoose.Schema
const CardSchema = new Schema({
    ID: {type: String, required: true},
    location: {type: String, required: true},
    info: {type: String, required: true},
    time: {type: Date, required: true},
    founded: {type: String, required: true},
    image: [{
        data: Buffer,
        contentType: String
    }]},
    {timestamps: { createdAt: 'created_at'}}
)
const Card = mongoose.model('card', CardSchema);

const mailSchema = new Schema({
    ID: {type: String, required: true},
    checkPassword: {type: Number, required: true},
    sent: {type: Boolean, required: true}
    },
    {timestamps: { createdAt: 'created_at'}}
)
const Mail = mongoose.model('mail', mailSchema);
export {Card, Mail};