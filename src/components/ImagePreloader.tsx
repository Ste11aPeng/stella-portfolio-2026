import { useEffect } from "react";
import { projects } from "@/data/projects";

/**
 * Preloads all project cover images into browser cache on mount
 * to prevent flash/flicker when navigating between pages.
 */
const ImagePreloader = () => {
  useEffect(() => {
    projects.forEach((project) => {
      const img = new Image();
      img.src = project.image;
    });
  }, []);

  return null;
};

export default ImagePreloader;
