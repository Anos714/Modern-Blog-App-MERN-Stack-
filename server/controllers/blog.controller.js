import { imagekit } from "../config/imageKit.js";
import { BlogModel } from "../models/Blog.js";
import { customError } from "../utils/customError.js";

export const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await BlogModel.find()
      .populate({
        path: "author",
        select: "-password",
      })
      .sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      blogs,
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findById(id).populate({
      path: "author",
      select: "-password",
    });
    if (!blog) {
      return customError(400, res, "Blog with this id doesn't found");
    }

    return res.status(200).json({
      success: true,
      blog,
    });
  } catch (error) {
    next(error);
  }
};

export const addBlog = async (req, res, next) => {
  const { title, subTitle, content, category } = req.body;
  const imageFile = req.file;
  if (
    !title ||
    !subTitle ||
    !content ||
    !imageFile ||
    !category ||
    title === "" ||
    subTitle === "" ||
    content === "" ||
    imageFile === "" ||
    category === ""
  ) {
    return customError(400, res, "All fields are required");
  }
  try {
    const uploadedImage = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
      folder: "/blogs",
    });
    const imageURL = imagekit.url({
      path: uploadedImage.filePath,
      transformation: [
        { quality: "auto" },
        { width: "1280px" },
        { format: "webp" },
      ],
    });

    const image = imageURL;

    const blog = await BlogModel.create({
      title,
      subTitle,
      content,
      image,
      category,
      author: req.userInfo.userId,
    });

    return res.status(201).json({
      success: true,
      msg: "Blog created successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  const { title, subTitle, content, category } = req.body;
  const imageFile = req.file;

  const { id } = req.params;

  if (title !== undefined && title.trim() === "") {
    return customError(400, res, "Blog title should not be empty");
  }
  if (subTitle !== undefined && subTitle.trim() === "") {
    return customError(400, res, "Blog sub title should not be empty");
  }
  if (content !== undefined && content.trim() === "") {
    return customError(400, res, "Blog content should not be empty");
  }
  if (category !== undefined && category.trim() === "") {
    return customError(400, res, "Blog category should not be empty");
  }

  const updatedData = { title, subTitle, content, category };

  try {
    if (imageFile) {
      const response = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
        folder: "/blogs",
      });

      const imageURL = imagekit.url({
        path: response.filePath,
        transformation: [
          { format: "webp" },
          { quality: "auto" },
          { width: "1280px" },
        ],
      });

      console.log(imageURL);

      updatedData.image = imageURL;
    }

    const blog = await BlogModel.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!blog) {
      return customError(400, res, "Blog with this id cannot found");
    }
    return res.status(200).json({
      success: true,
      msg: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const blog = await BlogModel.findByIdAndDelete(id);
    if (!blog) {
      return customError(400, res, "Blog with this id cannot found");
    }
    return res.status(200).json({
      success: true,
      msg: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    next(error);
  }
};
