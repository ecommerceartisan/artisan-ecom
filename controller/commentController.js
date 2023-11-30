import fs from "fs";
import productModel from "../models/productModel.js"; // Import the product model
import Comment from "../models/commentModel.js";

export const addCommentController = async (req, res) => {
  try {
    const { text } = req.fields;
    const { photo } = req.files;
    const { productId } = req.params;

    // Validation
    if (!text) {
      return res.status(400).send({ error: "Text is required for a comment" });
    }

    const comment = new Comment({
      text,
      user: req.user._id,
      product: productId,
    });

    if (photo) {
      comment.photo.data = fs.readFileSync(photo.path);
      comment.photo.contentType = photo.type;
    }

    await comment.save();

    // Update product with the new comment
    await productModel.findByIdAndUpdate(
      productId,
      { $push: { comments: comment._id } },
      { new: true }
    );

    res.status(201).send({
      success: true,
      message: "Comment added successfully",
      comment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in adding comment",
    });
  }
};
