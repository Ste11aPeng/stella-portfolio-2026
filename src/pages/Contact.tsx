import { useCallback, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";

const Contact = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();
    await navigator.clipboard.writeText("stellanotfound@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <>
      <Seo
        page="contact"
        path="/contact"
        description="Contact Stella Peng, product designer. Email, LinkedIn, X, and Instagram, plus what she is currently available for."
      />
      <div className="min-h-screen bg-background relative z-10">
        <Header />
        <main className="px-8 py-16 lg:px-24 md:px-[32px] md:py-[64px] max-w-[1440px] mx-auto">
          <h1 className="text-[1.5rem] leading-[1.85rem] md:text-[2rem] md:leading-[2.4rem] site-title">
            contact
          </h1>

          <div className="mt-8 max-w-2xl flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground font-sans">
            <p>
              The fastest way to reach me is email. I read everything and reply to
              messages that are specific about what you are building and what you need.
            </p>

            <div>
              <p className="text-foreground mb-2">direct</p>
              <ul className="flex flex-col gap-1">
                <li>
                  <button
                    onClick={handleCopyEmail}
                    className="hover:text-foreground transition-colors"
                  >
                    {copied ? "copied!" : "stellanotfound@gmail.com"}
                  </button>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/stellapengrnr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    linkedin
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/PengSte11a41091"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    x
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/abtste11a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors"
                  >
                    instagram
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-foreground mb-2">what i'm open to</p>
              <ul className="flex flex-col gap-1">
                <li>
                  Product design internships and new grad roles, after my Master of HCI +
                  Design at the University of Washington.
                </li>
                <li>
                  Short 0 to 1 engagements with early-stage teams: research, concept
                  design, design systems, prototyping, design engineering hand-off.
                </li>
                <li>
                  Chats with students or career switchers about design and HCI. Always
                  free, and I try to make time.
                </li>
              </ul>
            </div>

            <p>
              Based in the United States, Pacific time. Expect a reply within two to three
              business days. For anything time-sensitive, include your deadline.
            </p>
          </div>
        </main>
      </div>

      <div className="sticky bottom-0 z-0">
        <Footer />
      </div>
    </>
  );
};

export default Contact;
