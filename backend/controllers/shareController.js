import SharedText from "../models/SharedText.js";
import { generateSlug } from "../utils/generateSlug.js";

export const shareText = async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({ message: "Text is required" });
    }

    const slug = generateSlug();

    await SharedText.create({
      text,
      slug,
      user_id: req.user.id
    });

    res.json({
      message: "Slug generated successfully",
      slug
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const recivetext = async (req, res) => {
  try {
    const { slug } = req.params;
    if (!slug) {
      return res.status(400).json({ message: "Slug is required" });
    }
    const sharedText = await SharedText.findOne({ slug });
    if (!sharedText) {
      return res.status(404).json({ message: "Text not found" });
    }
    res.json(sharedText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
