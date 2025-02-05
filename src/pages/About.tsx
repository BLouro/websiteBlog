import React, { useEffect, useState } from "react";

interface AboutConfig {
  title: string;
  content: string;
}

const About: React.FC = () => {
  const [aboutConfig, setAboutConfig] = useState<AboutConfig | null>(null);

  useEffect(() => {
    import("../content/config.json").then((config) => setAboutConfig(config.aboutPage));
  }, []);

  if (!aboutConfig) return <p>Loading...</p>;

  return (
    <div>
      <h1>{aboutConfig.title}</h1>
      <p>{aboutConfig.content}</p>
    </div>
  );
};

export default About;