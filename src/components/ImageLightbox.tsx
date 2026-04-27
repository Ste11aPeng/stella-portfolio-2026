import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

interface ImageLightboxProps {
  src: string;
  alt: string;
  className?: string;
  disableMotion?: boolean;
}

const ImageLightbox = ({ src, alt, className = "", disableMotion = false }: ImageLightboxProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {disableMotion ? (
        <img
          src={src}
          alt={alt}
          className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
          onClick={() => setIsOpen(true)}
        />
      ) : (
        <motion.img
          src={src}
          alt={alt}
          className={`cursor-pointer hover:opacity-90 transition-opacity ${className}`}
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
