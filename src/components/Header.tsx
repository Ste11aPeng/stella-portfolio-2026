const Header = () => {
  return <header className="flex items-center justify-between px-8 py-6 md:px-16 lg:px-24">
      <a href="/" className="text-foreground font-medium text-base">Stella P.</a>
      <nav className="flex items-center gap-6 md:gap-8">
        <a href="#work" className="nav-link text-sm">work</a>
        <a href="#play" className="nav-link text-sm">play</a>
        <a href="#me" className="nav-link text-sm">me</a>
        <a href="#resume" className="nav-link text-sm">resume</a>
      </nav>
    </header>;
};
export default Header;