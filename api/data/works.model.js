var mongoose = require('mongoose');

var workSchema = new mongoose.Schema({
 	name : {
 		type : String,
 		required : true
 	},
 	address : String,
 	fault: String,
 	technician: String,
 	phone: Number,
 	submitted: Boolean,
 	progress: Boolean,
 	completed: Boolean,
 	email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
 	createdOn : {
 		type: Date,
 		"default" : Date.now
 	}
});

mongoose.model('Work', workSchema, 'information');