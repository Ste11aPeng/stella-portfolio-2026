import { useEffect } from "react";
import { projects } from "@/data/projects";

/**
 * Preloads only the first 2 project cover images (visible in viewport)
 * to prevent flash/flicker without wasting bandwidth.
 */
const ImagePreloader = () => {
  useEffect(() => {
    projects.slice(0, 2).forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  return null;
};

export default ImagePreloader;
