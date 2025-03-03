import React, { useEffect, useState } from "react";
import {FaGithub, FaLinkedin, FaMedium} from "react-icons/fa";
import { GiButterfly} from "react-icons/gi";

interface SocialLink {
  name: string;
  url: string;
}

interface FooterConfig {
  copyright: string;
  socialLinks: SocialLink[];
}

const iconMap: Record<string, JSX.Element> = {
  GitHub: <FaGithub />,
  LinkedIn: <FaLinkedin />,
  BlueSky: <GiButterfly />,
  Medium: <FaMedium />,
};

const Footer: React.FC = () => {
  const [footerConfig, setFooterConfig] = useState<FooterConfig | null>(null);

  useEffect(() => {
    import("../content/config.json").then((config) => setFooterConfig(config.footer));
  }, []);

  if (!footerConfig) return null;

  return (
    <footer className="bg-slate-400 dark:bg-dark-header text-white  p-6 text-center">
      <p>{footerConfig.copyright}</p>
      <div className="flex justify-center gap-4 mt-2">
        {footerConfig.socialLinks.map((link, index) => (
          <a key={index} href={link.url} target="_blank" rel="noopener noreferrer" className="text-white text-2xl">
            {iconMap[link.name] || link.name}
          </a>
        ))}
      </div>
    </footer>
  );
};

export default Footer;
