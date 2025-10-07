import { Request, Response } from "express";
import logger from "../config/logger.config";

export const uploadVideoController = async (req: Request, res: Response) => {
  logger.info("File uploaded request received");
  if (!req.file) {
    res.status(400).json({ message: "No file uploaded" });
    return;
  }

  const videoPath = req.file.path;
  res.status(200).json({ message: "File uploaded successfully", videoPath });
};
