const mongoose = require("mongoose");

const ArticleSchema = new mongoose.Schema(
  {
    creator_name: String,
    creator_googleid: String,
    article_name: String,
    article_description: String,
    article_id: String,
    article_content: [
      {
        content_type: {
          type: String,
          enum: ["Header", "Paragraph", "Image", "Source"],
          required: true,
        },
        content_text: {
          type: String,
          required: true,
        },
        content_link: {
          type: String,
          required: false,
        },
      },
    ],
    article_image: String,
  },
  { timestamps: true }
);

// compile model from schema
module.exports = mongoose.model("article", ArticleSchema);
