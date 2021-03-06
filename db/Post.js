const {mongoose} = require('./mongoose');

const Post = mongoose.model('Post', {
	writer: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    postNumber: {
        type: Number,
        required: true
    },
	dateCreated: {
		type: String,
		required: true
    },
    mainImg: {
        type: String,
        required: true
    },
	title: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
    },
    subtitle: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	content: {
		type: String,
		required: true,
		minlength: 30,
		trim: true
	}
});

module.exports = {
	Post
}