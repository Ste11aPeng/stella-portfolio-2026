import { useLocation } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const NotFound = () => {
  const location = useLocation();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const handleCopyEmail = useCallback(async () => {
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Seo page="page not found" path={location.pathname} description="This page doesn't exist. Head back to Stella Peng's portfolio home." />
      <Header />

      <main className="flex-1 flex items-center justify-center px-8 py-24">
        <div className="text-center max-w-md">
          <p className="text-sm tracking-widest uppercase text-muted-foreground/50 mb-4 font-sans">
            404
          </p>
          <h1
            className="text-4xl md:text-5xl mb-4"
            style={{ fontFamily: "'New Spirit', serif", fontWeight: 400 }}
          >
            Page not found
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed mb-10 font-sans">
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-sans text-primary-foreground bg-primary rounded-md hover:bg-primary/90 transition-colors"
            >
              Back to home
            </a>
          </div>

          {/* Contact */}
          <div className="mt-16 pt-8 border-t border-border/30">
            <p className="text-xs tracking-widest uppercase text-muted-foreground/40 mb-4 font-sans">
              Get in touch
            </p>
            <div className="flex items-center justify-center gap-4 text-sm font-sans">
              <button
                onClick={handleCopyEmail}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {copied ? "copied!" : "email"}
              </button>
              <span className="text-border">·</span>
              <a
                href="https://www.linkedin.com/in/stellapengrnr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                linkedin
              </a>
              <span className="text-border">·</span>
              <a
                href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                resume
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
