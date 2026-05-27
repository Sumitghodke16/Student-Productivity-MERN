require("dns").setDefaultResultOrder("ipv4first");

const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const { translate } =
require("google-translate-api-x");

const connectDB =
require("./config/db");

// ================= ROUTES =================

const authRoutes =
require("./routes/authRoutes");

const studyRoutes =
require("./routes/studyRoutes");

const dictionaryRoutes =
require("./routes/dictionaryRoutes");

const notesRoutes =
require("./routes/notesRoutes");

// ================= CONFIG =================

dotenv.config();

connectDB();

const app = express();

// ================= MIDDLEWARE =================

app.use(cors());

app.use(express.json());

// ================= API ROUTES =================

app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/study",
  studyRoutes
);

app.use(
  "/api/dictionary",
  dictionaryRoutes
);

app.use(
  "/api/notes",
  notesRoutes
);

// ================= TRANSLATOR API =================

app.post(
  "/translate",

  async (req, res) => {

    try {

      const {
        text,
        from,
        to,
      } = req.body;

      const result =
        await translate(text, {

          from:
            from || "en",

          to:
            to || "mr",

        });

      res.json({

        translated:
          result.text,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        error:
          "Translation failed",

      });

    }

  }
);

// ================= TEST ROUTE =================

app.get("/", (req, res) => {

  res.send(
    "Study Focus API Running..."
  );

});

// ================= SERVER =================

const PORT =
  process.env.PORT || 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on port ${PORT}`
  );

});