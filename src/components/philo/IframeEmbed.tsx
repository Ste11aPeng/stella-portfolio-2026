import { motion } from "framer-motion";

interface IframeEmbedProps {
  src: string;
  title: string;
  /** CSS aspect-ratio value, e.g. "1536 / 864" */
  aspect?: string;
  /** Optional max width in px, centers the frame horizontally */
  maxWidth?: number;
  className?: string;
}

const IframeEmbed = ({
  src,
  title,
  aspect = "1536 / 864",
  maxWidth,
  className = "",
}: IframeEmbedProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`w-full overflow-hidden rounded-lg border border-border/30 ${
        maxWidth ? "mx-auto" : ""
      } ${className}`}
      style={{
        aspectRatio: aspect,
        maxWidth: maxWidth ? `${maxWidth}px` : undefined,
      }}
    >
      <iframe
        src={src}
        title={title}
        loading="lazy"
        className="block w-full h-full"
      />
    </motion.div>
  );
};

export default IframeEmbed;
