const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 md:px-12 bg-muted/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Don't be a stranger</p>
        
        <div className="w-3 h-3 rounded-full bg-muted-foreground/40" />
        
        <nav className="flex items-center gap-6">
          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            linkedin
          </a>
          <a 
            href="mailto:your@email.com"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            email
          </a>
          <a 
            href="https://drive.google.com/file/d/1GBV0XPi594jlw8w1T5tvuYeYDhqGcCh4/view" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            resume
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
