const mongoose = require("mongoose");

const studySessionSchema =
  new mongoose.Schema(
    {
      user: {
        type:
          mongoose.Schema.Types.ObjectId,

        ref: "User",

        required: true,
      },

      subject: {
        type: String,

        required: true,
      },

      topic: {
        type: String,

        required: true,
      },

      focusDuration: {
        type: Number,

        required: true,
      },

      breakDuration: {
        type: Number,

        required: true,
      },

      totalSessions: {
        type: Number,

        required: true,
      },

      // IMPORTANT

      date: {
        type: String,
      },

      time: {
        type: String,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "StudySession",
    studySessionSchema
  );