const Note =
require("../models/Note");

// ================= ADD NOTE =================

const addNote =
async (req, res) => {

  try {

    const { content } =
    req.body;

    const newNote =
    new Note({

      user:
      req.user._id,

      content,

    });

    await newNote.save();

    res.status(201).json({

      success: true,

      message:
      "Note Saved",

      data: newNote,

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Server Error",

    });

  }

};

// ================= GET NOTES =================

const getNotes =
async (req, res) => {

  try {

    const notes =
    await Note.find({

      user:
      req.user._id,

    }).sort({

      createdAt: -1,

    });

    res.status(200).json(
      notes
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Error Fetching Notes",

    });

  }

};

// ================= DELETE NOTE =================

const deleteNote =
async (req, res) => {

  try {

    await Note.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
      "Note Deleted",

    });

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
      "Delete Failed",

    });

  }

};

module.exports = {

  addNote,

  getNotes,

  deleteNote,

};