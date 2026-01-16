import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Blog title is required"],
      trim: true,
    },
    subTitle: {
      type: String,
      required: [true, "Blog sub title is required"],
      trim: true,
    },
    content: {
      type: String,
      required: [true, "Blog content is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Blog image is required"],
    },
    category: {
      type: String,
      required: [true, "Blog category is required"],
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    readTime: {
      type: Number,
      default: 1,
    },
    isFeatured: {
      type: Boolean,
      default: false,
      required: true,
    },
  },

  { timestamps: true }
);

export const BlogModel = mongoose.model("Blog", BlogSchema);
