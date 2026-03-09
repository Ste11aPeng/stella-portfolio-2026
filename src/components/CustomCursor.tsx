import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const rafId = useRef<number>();
  const target = useRef({ x: 0, y: 0 });
  const position = useRef({ x: 0, y: 0 });
  const isMoving = useRef(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsVisible(true);
  }, [location.pathname]);

  useEffect(() => {
    let moveTimeout: ReturnType<typeof setTimeout>;

    const animate = () => {
      const ease = 0.15;
      const dx = target.current.x - position.current.x;
      const dy = target.current.y - position.current.y;

      position.current.x += dx * ease;
      position.current.y += dy * ease;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }

      // Stop loop when close enough
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        rafId.current = requestAnimationFrame(animate);
      } else {
        isMoving.current = false;
      }
    };

    const startAnimation = () => {
      if (!isMoving.current) {
        isMoving.current = true;
        rafId.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
      startAnimation();
    };

    const handleProjectCardHover = (e: CustomEvent<{ hovering: boolean }>) => {
      setIsVisible(!e.detail.hovering);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("projectCardHover", handleProjectCardHover as EventListener);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("projectCardHover", handleProjectCardHover as EventListener);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      clearTimeout(moveTimeout);
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
