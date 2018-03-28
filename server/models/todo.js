var {mongoose, Schema} = require('../db/mongoose.js');

var todoSchema = new Schema({
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    },
    _creatorId: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    collection: 'Todo123'
});

var Todo = mongoose.model('Todo', todoSchema);

module.exports = {Todo};