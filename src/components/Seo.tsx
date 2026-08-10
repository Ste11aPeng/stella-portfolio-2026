import { Helmet } from "react-helmet-async";

export const SITE_NAME = "Stella";
export const SITE_FULL_NAME = "Stella Peng";
export const SITE_URL = "https://ruocanpeng.com";

interface SeoProps {
  /** Page label, e.g. "about". Omit for the homepage. */
  page?: string;
  description: string;
  /** Route path starting with "/", e.g. "/about". Defaults to "/". */
  path?: string;
  image?: string;
}

const Seo = ({ page, description, path = "/", image }: SeoProps) => {
  const title = page ? `${page} · ${SITE_NAME}` : SITE_FULL_NAME;
  const url = `${SITE_URL}${path === "/" ? "/" : path}`;
  const ogImage = image ?? `${SITE_URL}/images/og-image.png`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
};

export default Seo;
