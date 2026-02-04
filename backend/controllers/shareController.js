// import SharedText from "../models/SharedText.js";
// import { generateSlug } from "../utils/generateSlug.js";
// import jwt from "jsonwebtoken";
  
// export const shareText = async (req, res) => {
//    try{
//     const {"user_token"}=req.cookies;
//     if(!user_token){
//         res.status(401).json({message:"Unauthorized"})
//     }
//     const user = jwt.verify(user_token, process.env.JWT_SECRET);
//     if(!user){
//         res.status(401).json({message:"Invalid token"})
//     }
//     const sharedText = await SharedText.create({ ...req.body, user_id: user._id });
//     res.json({ message: "Text shared" });
//    }
//    catch(error){
//     res.status(500).json({message:error.message})
//    }
// } 

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

export const recivetext = async (req,res) =>{
  try{
    const {slug} = req.params;
   if(!slug){
    res.status(400).json({message:"Slug is required"})
   }
   const sharedText = await SharedText.findOne({slug})
   if(!sharedText){
    res.status(404).json({message:"Text not found"})
   }
   res.json(sharedText)
  }
  catch(error){
    res.status(500).json({ message: error.message });
  }
}
