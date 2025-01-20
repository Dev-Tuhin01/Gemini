import {Request, Response} from "express";
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs";

interface Options {
  compressionType : 'lossy' | 'lossless'
  quality?: number;
}

const compression = async (req: Request, res: Response) => {
  const file = req.file;

  try {
    if(file){
      const originalPath = path.join(__dirname,"..","..","uploads",file.filename);
      const compressedPath = path.join(__dirname,"..","..","compressed",file.filename);

      await sharp(originalPath).jpeg({ quality: 50 }).toFile(compressedPath);
      const imageBuffer = await fs.promises.readFile(compressedPath);
      const base64Image = imageBuffer.toString('base64');

      fs.unlinkSync(originalPath);
      fs.unlinkSync(compressedPath);

      res.status(200).json({
        message: "Image compressed Successfully",
        image: `data:image/jpeg;base64,${base64Image}`
      });

    } else {
      res.status(400).json({
        error: "🔍 No Image found"
      })
    }
  } catch(error) {
    console.error("Something went wrong",error);
    res.status(500).json({
      error: "😿 something went wrong"
    })
  }
}

export default compression;
