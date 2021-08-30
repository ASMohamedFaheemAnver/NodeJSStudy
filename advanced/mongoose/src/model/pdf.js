const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const pdfSchema = new Schema(
  {
    pdf_name: { type: String, required: true, trim: true },
    pdf_url: { type: String, required: true, trim: true },
    pdf_image_url: { type: String, required: true, trim: true },
    is_removed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pdf", pdfSchema);
