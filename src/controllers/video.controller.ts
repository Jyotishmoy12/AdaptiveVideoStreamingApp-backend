import { Request, Response } from "express";
import logger from "../config/logger.config";

export const uploadVideoController = async (req: Request, res: Response) => {
  logger.info("File uploaded request received");
  if (!req.file) return res.status(400).json({ message: "No file uploaded" });
};
