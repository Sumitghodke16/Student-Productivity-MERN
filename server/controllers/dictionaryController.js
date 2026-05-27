const DictionaryWord =
require("../models/DictionaryWord");

// ================= SAVE WORD =================

const saveWord =
async (req, res) => {

  try {

    const {
      word,
      meaning,
    } = req.body;

    const newWord =
      new DictionaryWord({

        user: req.user._id,

        word,

        meaning,

      });

    await newWord.save();

    res.status(201).json({

      success: true,

      message:
        "Word Saved",

      data: newWord,

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

// ================= GET WORDS =================

const getWords =
async (req, res) => {

  try {

    const words =
      await DictionaryWord.find({

        user: req.user._id,

      }).sort({

        createdAt: -1,

      });

    res.status(200).json(
      words
    );

  } catch (error) {

    console.log(error);

    res.status(500).json({

      success: false,

      message:
        "Error Fetching Words",

    });

  }

};

// ================= DELETE WORD =================

const deleteWord =
async (req, res) => {

  try {

    await DictionaryWord.findByIdAndDelete(
      req.params.id
    );

    res.status(200).json({

      success: true,

      message:
        "Deleted Successfully",

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

  saveWord,

  getWords,

  deleteWord,

};