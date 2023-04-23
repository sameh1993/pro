const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  lang: {
    type: String,
    required: true,
  },
  sliders: [
    { _id: mongoose.Types.ObjectId, title: String, desc: String, img: String },
  ],
  serivces: [
    {
      serId: mongoose.Types.ObjectId,
      serivceName: { type: String, trim: true },
      img: { type: String, trim: true },
      desc: [
        {
          title: { type: String, trim: true },
          body: [{ type: String, trim: true }],
        },
      ],
    },
  ],
});

const project = mongoose.model("project", projectSchema);

module.exports = project;
