import { IResolution } from "../../Dtos/IResolution.dto";

const resolution: IResolution[] = [
  { width: 1920, height: 1080, bitRate: 2000 }, // 1080p
  { width: 1280, height: 720, bitRate: 1000 }, // 720p
  { width: 854, height: 480, bitRate: 500 }, // 480p
  { width: 640, height: 360, bitRate: 400 }, // 360p
  { width: 256, height: 144, bitRate: 200 }, // 240p
];

export default resolution;
