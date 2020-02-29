let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let bcrypt = require('bcrypt');
let uniqueValidator = require('mongoose-unique-validator');
let validator = require('validator');
 
let UserSchema = new Schema({
    email: {
        type: String,
        required: [true, "Email cannot be blank"],
        unique: true,
        minlength: [3, 'Email is too short'],
        maxlength: [50, 'Email is too long'],
        validate: [{validator: value => validator.isEmail(value), msg: 'Invalid email'}]
    },
    password: {
        type: String,
        required: [true, "Password cannot be blank"],
        minlength: [8, 'Password is too short']
    },
    full_name: {
        type: String,
        minlength: [1, 'Name is too short'],
        maxlength: [50, 'Name is too long'],
        required: [true, "Name cannot be blank"]
    },
    username: {
        type: String,
        minlength: [1, 'Display name is too short'],
        maxlength: [50, 'Display name is too long'],
        required: [true, "Display name cannot be blank"]
    },
    profile_img_url: {
        type: String
    },
    account_type: {
        type: String,
        default: 'free'
    },
    last_login: {
        type: Date,
        default: new Date()
    },
    is_facebook_account: {
        type: Boolean,
        default: false
    },
    tokens: {
        reset_password_token: {type: String},
        reset_password_expires: {type: Date},
    },
    articles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article'
    }]
}, {timestamps: true});

// -------------
// Config Schema
// -------------

// Generating a hash
UserSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

// Checking if password is valid
UserSchema.methods.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

// Plugin for pretty uniqueness error message
UserSchema.plugin(uniqueValidator);

// -------------
// Return Schema
// -------------
mongoose.model('User', UserSchema);