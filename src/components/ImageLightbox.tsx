import { motion } from "framer-motion";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  disableMotion?: boolean;
  /** When true, removes the default hover:opacity-90 effect on the trigger image. */
  disableHoverEffect?: boolean;
}

const ImageLightbox = ({
  src,
  alt,
  className = "",
  disableMotion = false,
  disableHoverEffect = false,
}: ImageLightboxProps) => {
  const classes = `${disableHoverEffect ? "" : "hover:opacity-90 transition-opacity"} ${className}`;

  if (disableMotion) {
    return <img src={src} alt={alt} className={classes} />;
  }

  return (
    <motion.img
      src={src}
      alt={alt}
      className={classes}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    />
  );
};

export default ImageLightbox;
