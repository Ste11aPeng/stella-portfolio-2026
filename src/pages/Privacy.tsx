import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Privacy = () => {
  return (
    <>
      <Seo
        page="privacy"
        path="/privacy"
        description="Privacy policy for ruocanpeng.com: what data this personal portfolio collects, which third parties are involved, and how to request removal."
      />
      <div className="min-h-screen bg-background relative z-10">
        <Header />
        <main className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px] max-w-[1440px] mx-auto">
          <h1 className="text-[1.5rem] leading-[1.85rem] md:text-[2rem] md:leading-[2.4rem] site-title">
            privacy
          </h1>

          <div className="mt-8 max-w-2xl flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground font-sans">
            <p>Last updated: August 2026.</p>
            <p>
              This is my personal portfolio. It is a static website: no accounts, no login,
              no cart, no newsletter signup. Nothing here asks you for personal
              information.
            </p>

            <div>
              <p className="text-foreground mb-2">what is collected</p>
              <ul className="flex flex-col gap-1">
                <li>
                  No forms. There is no contact form and no field that collects your name,
                  email, or any other personal detail. Reaching out is always your own
                  action, through email or a social platform.
                </li>
                <li>No advertising, and nothing is sold, rented, or shared with data brokers.</li>
                <li>
                  Small technical preferences may be stored in your browser. That data
                  never leaves your device.
                </li>
              </ul>
            </div>

            <div>
              <p className="text-foreground mb-2">third parties</p>
              <p>
                The site is hosted on GitHub Pages, which processes standard server logs
                such as IP address and user agent. Fonts load from Google Fonts, and an
                anonymous analytics script records aggregate page usage so I can see which
                case studies people read. Outbound links to LinkedIn, X, Instagram, TikTok,
                and Google Drive are governed by those services' own policies.
              </p>
            </div>

            <div>
              <p className="text-foreground mb-2">your choices</p>
              <p>
                Blocking scripts or cookies will not break this site. If you emailed me and
                want that correspondence deleted, write to stellanotfound@gmail.com and I
                will delete it.
              </p>
            </div>
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Privacy;
