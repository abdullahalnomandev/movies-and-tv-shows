import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { mongoose } from "mongoose";
import validator from 'validator';
const UserSchema = mongoose.Schema({

    email: {
        type: String,
        lowercase: true,
        required: [true, "Please provide your email address"],
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email address"
        ],
        validate: {
            validator: function (value) {
                return this.model("User")
                    .findOne({ email: value })
                    .then((user) => !user);
            },
            message: (props) => `${props.value} is already used by another user`
        }
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        validate: {
            validator: function (value) {
                validator.isStrongPassword(value, {
                    minlength: 6,
                    minLowercase: 3,
                    minNumbers: 1,
                    minSymbols: 1
                })
            },
            message: "Password {VALUE} is not strong enough."
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password don't match!"
        }
    }
    ,
    role: {
        type: String,
        enum: {
            values: ["user", "admin"],
            message: "The {VALUE} is not a correct role"
        },
        default: 'user'
    },
    firstName: {
        type: String,
        required: [true, "Please provide the first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide the first name"],
        trim: true,
        minLength: [3, "Name must be at least 3 characters."],
        maxLength: [100, "Name is too large"]
    },
    contractNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide contract number"]
    },
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid url"]
    }
},

    {
        timestamps: true
    });

UserSchema.pre("save", function (next) {
    const password = this.password;
    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;
    next();
})

UserSchema.methods.comparePassword = function (password, hash) {
    const isPasswordValid = bcrypt.compareSync(password, hash);
    return isPasswordValid;

}

UserSchema.methods.generateConfirmationToken = function (password, hash) {

    const token = crypto.randomBytes(32).toString('hex');
    this.confirmationToken = token;

    const date = new Date();
    date.setDate(date.getDate() + 1)
    this.confirmationTokenExpires = date;

    return token;
}

const User = mongoose.model('User', UserSchema);

export default User;
