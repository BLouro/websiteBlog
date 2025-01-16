import React, { useEffect, useState } from "react";

interface HomeConfig {
  siteTitle: string;
  description: string;
}

const Home: React.FC = () => {
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);

  useEffect(() => {
    import("../content/config.json").then((config) => setHomeConfig(config));
  }, []);

  if (!homeConfig) return <p>Loading...</p>;

  return (
    <div>
      <h1>{homeConfig.siteTitle}</h1>
      <p>{homeConfig.description}</p>
    </div>
  );
};

export default Home;
