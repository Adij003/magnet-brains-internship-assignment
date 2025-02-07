const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, 
        required: true 
    },
    dueDate: { 
        type: Date, 
        required: true 
    },
    status: {
      type: String,
      enum: ["pending", "completed"],
      default: "pending",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    assignedUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
