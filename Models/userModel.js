const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      tyepe: String,
      required: [true, "the user must have a fullname."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "a user must have an email."],
      validate: [validator.isEmail, "please provide a valide email."],
    },
    password: {
      type: String,
      required: [true, "please provide ur password"],
      min: [8, "the password must be 8 caracters at least."],
    },
    passwordConfirm: {
      type: String,
      required: [true, "please confirm ur password."],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
      },
      select: false,
    },
    resetToken: {
      type: String,
    },
    resetTokenExpAt: {
      type: Date,
    },
    location: {
      country: {
        type: String,
        required: [true, "a user must live in a country."],
      },
      city: {
        type: String,
        required: [true, "a user must live a city."],
      },
      postalCode: {
        type: Number,
      },
    },
    gender: {
      type: String,
      enum: {
        values: ["Male", "Female"],
        message: "the gender must be either Male or Female.",
      },
      required: [true, "a user must have a gender."],
    },
    profilePhoto: {
      type: String,
    },
    profilePhoto: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
  this.passowrdConfirm = undefined;
});

userSchema.methods.isCorrectPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);
