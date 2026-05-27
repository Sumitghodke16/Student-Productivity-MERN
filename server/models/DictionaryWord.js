const mongoose = require("mongoose");

const dictionarySchema =
  new mongoose.Schema(

    {

      user: {

        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,

      },

      word: {

        type: String,

        required: true,

      },

      meaning: {

        type: String,

        required: true,

      },

    },

    {

      timestamps: true,

    }

  );

module.exports = mongoose.model(
  "DictionaryWord",
  dictionarySchema
);