import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleProjectCardHover = (e: CustomEvent<{ hovering: boolean }>) => {
      setIsVisible(!e.detail.hovering);
    };

    const animate = () => {
      const ease = 0.15;
      
      position.current.x += (target.current.x - position.current.x) * ease;
      position.current.y += (target.current.y - position.current.y) * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }

      requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("projectCardHover", handleProjectCardHover as EventListener);
    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("projectCardHover", handleProjectCardHover as EventListener);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 w-4 h-4 rounded-full bg-muted-foreground/60 pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ willChange: "transform" }}
    />
  );
};

export default CustomCursor;
