import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Preload LCP image (first project card) for faster discovery
import askSiaImage from "@/assets/project-asksia.jpg";
const preloadLink = document.createElement("link");
preloadLink.rel = "preload";
preloadLink.as = "image";
preloadLink.href = askSiaImage;
preloadLink.fetchPriority = "high";
document.head.appendChild(preloadLink);

createRoot(document.getElementById("root")!).render(<App />);
