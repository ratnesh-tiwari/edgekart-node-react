const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A user can must have a name.'],
      minLength: [4, 'A name can not be shorter than 4 characters.'],
      maxLength: [40, 'A name can not exceed 40 characters.'],
    },
    email: {
      type: String,
      required: [true, 'A user can must have a name.'],
      unique: true,
      validate: [validator.isEmail, 'Please enter a valid email.'],
    },
    password: {
      type: String,
      required: [true, 'A user can not be created without password.'],
      minLength: [8, 'A password can not be shorter than 8 characters.'],
      select: false,
    },
    confirmPassword: {
      type: String,
      required: [true, 'Please enter password confirmation.'],
      validate: {
        validator: function (el) {
          return this.password === el;
        },
        message: 'Password does not match.',
      },
    },
    avatar: {
      public_id: {
        type: String,
      },
      url: {
        type: String,
      },
    },
    role: {
      type: String,
      enum: ['user', 'delivery-partner', 'seller', 'admin'],
      default: 'user',
    },
    resetPasswordToken: String,
    resetPasswordExpires: String,
    passwordChangeAt: Date,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtuall proderty
userSchema.virtual('address', {
  ref: 'Address',
  foreignField: 'user',
  localField: '_id',
});

// pre save middleware for password hashing
userSchema.pre('save', async function (next) {
  // this will only run if pass is modified
  if (!this.isModified('password')) return next();

  // hashing password and storing it
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

userSchema.pre('save', async function (next) {
  // this will only run if pass is modified
  if (!this.isModified('password') || this.isNew) return next();

  // saving the change prop by reducting 5 sec because sometime this may be slow
  this.passwordChangeAt = Date.now() - 5 * 1000;
  next();
});

userSchema.methods.checkCorrectPassword = async function (
  providedPassword,
  actualPassword
) {
  return await bcrypt.compare(providedPassword, actualPassword);
};

// check if token is generated after password change or not
userSchema.methods.changePasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangeAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangeAt.getTime() / 1000,
      10
    );
    return changeTimeStamp > JWTTimeStamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  // generating token
  const resetToken = crypto.randomBytes(32).toString('hex');

  // hashing and storing it in db
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // providing 10 minute to reset the password
  this.resetPasswordExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
