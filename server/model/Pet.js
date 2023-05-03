const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
const petSchema = new mongoose.Schema({
  type: {
    type: String,
    default: "",
  },
  totalFocusSession: {
    type: Number,
    default: 0,
  },
  totalFailedSession: {
    type: Number,
    default: 0,
  },
  totalSuccessfulSession: {
    type: Number,
    default: 0,
  },
  evolutionStage: {
    type: Number,
    default: 0,
  },
  //distribution among 15 minutes, 30 minutes, 45 minutes
  histogram: {
    type: [{ successSession: Number, failedSession: Number }],
    default: [0, 0, 0],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Pet", petSchema);

// {
//     type: "pig",
//     totalFocusSession: 0,
//     totalFailedSession: 0,
//     histogram: {
//       15: 0,
//       30: 0,
//       45: 0
//     }
//   }
