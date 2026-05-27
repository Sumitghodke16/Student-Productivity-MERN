const StudySession = require(
  "../models/StudySession"
);

// ================= ADD SESSION =================

const addSession =
  async (req, res) => {

    try {

      const {

        subject,

        topic,

        focusDuration,

        breakDuration,

        totalSessions,

      } = req.body;

      // ================= DATE & TIME =================

      const now =
        new Date();

      const date =
        now.toLocaleDateString(
          "en-GB"
        );

      const time =
        now.toLocaleTimeString(
          "en-IN",
          {
            hour: "2-digit",

            minute: "2-digit",

            second: "2-digit",

            hour12: true,
          }
        );

      // ================= CREATE SESSION =================

      const newSession =
        new StudySession({

          user:
            req.user._id,

          subject,

          topic,

          focusDuration,

          breakDuration,

          totalSessions,

          date,

          time,

        });

      await newSession.save();

      res.status(201).json({

        success: true,

        message:
          "Session Added Successfully",

        data: newSession,

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

// ================= GET SESSION =================

const getSessions =
  async (req, res) => {

    try {

      const sessions =
        await StudySession.find({

          user:
            req.user._id,

        }).sort({

          createdAt: -1,

        });

      res.status(200).json(
        sessions
      );

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Error Fetching Sessions",

      });

    }

  };

// ================= DELETE SESSION =================

const deleteSession =
  async (req, res) => {

    try {

      const deletedSession =
        await StudySession.findOneAndDelete(
          {

            _id:
              req.params.id,

            user:
              req.user._id,

          }
        );

      if (!deletedSession) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Session Not Found",

          });

      }

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

// ================= UPDATE SESSION =================

const updateSession =
  async (req, res) => {

    try {

      const updatedSession =
        await StudySession.findOneAndUpdate(

          {

            _id:
              req.params.id,

            user:
              req.user._id,

          },

          req.body,

          {

            new: true,

          }

        );

      if (!updatedSession) {

        return res
          .status(404)
          .json({

            success: false,

            message:
              "Session Not Found",

          });

      }

      res.status(200).json({

        success: true,

        message:
          "Session Updated",

        data:
          updatedSession,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Update Failed",

      });

    }

  };

// ================= ANALYTICS =================

const getAnalytics =
  async (req, res) => {

    try {

      const sessions =
        await StudySession.find({

          user:
            req.user._id,

        });

      // ================= TOTAL HOURS =================

      const totalStudyHours =
        sessions.reduce(

          (
            acc,
            item
          ) =>

            acc +
            Number(
              item.focusDuration
            ),

          0

        ) / 60;

      // ================= COMPLETED SESSIONS =================

      const completedSessions =
        sessions.length;

      // ================= FOCUS SCORE =================

      const totalFocus =
        sessions.reduce(

          (
            acc,
            item
          ) =>

            acc +
            Number(
              item.focusDuration
            ),

          0

        );

      const totalBreak =
        sessions.reduce(

          (
            acc,
            item
          ) =>

            acc +
            Number(
              item.breakDuration
            ),

          0

        );

      let focusScore = 0;

      if (
        totalFocus +
          totalBreak >
        0
      ) {

        focusScore =
          Math.round(

            (
              totalFocus /
              (
                totalFocus +
                totalBreak
              )
            ) *
              100

          );

      }

      // ================= TOP SUBJECT =================

      const topSubjectMap =
        {};

      sessions.forEach(
        (item) => {

          if (
            topSubjectMap[
              item.subject
            ]
          ) {

            topSubjectMap[
              item.subject
            ]++;

          } else {

            topSubjectMap[
              item.subject
            ] = 1;

          }

        }
      );

      let topSubject =
        "No Data";

      let max = 0;

      for (let key in topSubjectMap) {

        if (
          topSubjectMap[
            key
          ] > max
        ) {

          max =
            topSubjectMap[
              key
            ];

          topSubject = key;

        }

      }

      // ================= RESPONSE =================

      res.status(200).json({

        success: true,

        analytics: {

          totalStudyHours:
            totalStudyHours.toFixed(
              1
            ),

          completedSessions,

          focusScore,

          topSubject,

        },

        sessions,

      });

    } catch (error) {

      console.log(error);

      res.status(500).json({

        success: false,

        message:
          "Analytics Error",

      });

    }

  };

module.exports = {

  addSession,

  getSessions,

  deleteSession,

  updateSession,

  getAnalytics,

};