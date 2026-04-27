import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  const [isOpen, setIsOpen] = useState(false);

  const triggerClasses = `cursor-pointer ${
    disableHoverEffect ? "" : "hover:opacity-90 transition-opacity"
  } ${className}`;

  return (
    <>
      {disableMotion ? (
        <img
          src={src}
          alt={alt}
          className={triggerClasses}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          className={triggerClasses}
          onClick={() => setIsOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[90vw] max-h-[90vh] p-0 border-none bg-transparent shadow-none">
          <img
            src={src}
            alt={alt}
            className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageLightbox;
