// models/patientModel.js
const mongoose = require("mongoose");

const Schema = new mongoose.Schema(
  {
    name: {
      required: true,
      type: String,
    },
    status: {
      default: "Pending",
      type: String,
    },
    age: {
      required: true,
      type: String, // Consider changing to Number if appropriate
    },
    address: {
      required: true,
      type: String,
    },
    moNo: {
      required: true,
      type: String,
    },
    examiedBy: { // Consider renaming to 'examinedBy' for clarity
      required: true,
      type: String,
    },
    examiedDate: { // Consider renaming to 'examinedDate' for clarity
      required: true,
      type: Date,
    },
    selectedTest: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Test", // Ensure you have a Test model
    },
    reportDate: {
      type: Date,
      required: true,
    },
    result: [
      {
        name: {
          required: true,
          type: String,
        },
        range: {
          required: true,
          type: String,
        },
        unit: {
          required: true,
          type: String,
        },
        result: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        // Format the date fields
        ret.examiedDate = ret.examiedDate.toISOString().split('T')[0];
        ret.reportDate = ret.reportDate.toISOString().split('T')[0];
        ret.createdAt = ret.createdAt.toISOString().split('T')[0];
        ret.updatedAt = ret.updatedAt.toISOString().split('T')[0];
        return ret;
      },
    },
  }
);

const repo = mongoose.model("patient", Schema);
module.exports = repo;
