import mongoose from 'mongoose';
import validator from 'validator';
import bcryptjs from 'bcryptjs';
import crypto from 'crypto';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'There should be name.']
  },
  username: {
    type: String,
    required: [true, 'there should be email'],
    unique: true,
    lowerCase: true,
    validate: [validator.isEmail, 'Please provide valid email']
  },
  address: {
    type: String,
    required: [true, 'There should be address']
  },
  role: {
    type: String,
    enum: ['admin', "customer"],
    default: 'customer'
  },
  password: {
    type: String,
    required: [true, 'There should be password'],
    minLength: 5,
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'there should be password'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'passwords are not same'
    }
  },

  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function (value) {
        return validator.isMobilePhone(value, ['ne-NP', 'en-CA']); // Nepal & Canada
      },
      message: 'Invalid phone number for Nepal or Canada',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
//   timestamps: true
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcryptjs.hash(this.password, 12);

  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function(
  candidatePassword,
  userPassword
) {
  return await bcryptjs.compare(candidatePassword, userPassword);
};


userSchema.methods.changePasswordAfter = function(JWTTimeStamp) {
    if (this.passwordChangedAt) {
      const changedTimeStamp = parseInt(
        this.passwordChangedAt.getTime() / 1000,
        10
      );
      return JWTTimeStamp < changedTimeStamp;
    }
    return false;
  };
  
  userSchema.methods.createPasswordResetToken = function() {
    const resetToken = crypto.randomBytes(32).toString('hex');
  
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
  
    console.log({ resetToken }, this.passwordResetToken);
  
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
  };

  const User = mongoose.model('User', userSchema);

  export default User;