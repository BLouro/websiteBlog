import React, { useEffect, useState } from "react";

interface SocialLink {
  name: string;
  url: string;
}

interface FooterConfig {
  copyright: string;
  socialLinks: SocialLink[];
}

const Footer: React.FC = () => {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);

  useEffect(() => {
    import("../content/config.json").then((config) => setFooterConfig(config.footer));
  }, []);

  if (!footerConfig) return null;

  return (
    <footer style={{ textAlign: "center", padding: "1rem", borderTop: "1px solid #ccc" }}>
      <p>{footerConfig.copyright}</p>
      <div>
        {footerConfig.socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" style={{ margin: "0 5px" }}>
            {link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;