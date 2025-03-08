import React, { useEffect, useState } from "react";
import MyLogo  from '../assets/me.jpg';
import TechCarousels from "../components/TechCarousels";
import HomeBlogSection from "../components/HomeBlogSection";

interface HomeConfig {
  mainPageTitle: string;
  mainPageDescription: string;
  mainPageAbout: string;
  mainPageExt: string
  email: string;
}

const Home: React.FC = () => {
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);

  useEffect(() => {
    import("../content/config.json").then((config) => setHomeConfig(config));
  }, []);

  if (!homeConfig) return <p>Loading...</p>;

  return (
    <div className="mb-auto p-5 lg:pt-15 lg:pl-15 lg:pr-15 sm:pt-5 sm:pl-5 sm:pr-5">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-7 mb-5">
        <div className="">
          <div className="grid grid-cols-1 xl:grid-cols-[auto_1fr] gap-4">
            <div className="text-center md:text-left">
              <img src={MyLogo} alt="Profile pic" className="w-70 rounded-full mx-auto xl:mx-0" />
            </div>
            <div className="content-center text-center">
              <h2 className="text-5xl">
                👋&nbsp;<span className="bg-slate-800 dark:bg-slate-100 bg-clip-text font-extrabold text-transparent ">{homeConfig.mainPageTitle}</span>
              </h2>
              <p className="pt-5 text-justify">{homeConfig.mainPageDescription}</p> 
            </div>          
          </div>
          <div className="mt-5 text-justify">
            <p className="pt-5">{homeConfig.mainPageAbout}</p>
          </div>
          <div className="mt-5 text-justify">
            <p className="">{homeConfig.mainPageExt} <a className="bg-slate-400 dark:bg-stale-400 text-white p-1 hover:bg-slate-800 dark:hover:bg-dark-header" href={`mailto:${homeConfig.email}`}>{homeConfig.email}</a></p>
          </div>
        </div>
        <div className="bg-neutral-50 dark:bg-dark-header shadow-xl p-5 rounded-xl flex justify-center">
          <TechCarousels />
        </div>
      </div>
      <div className="bg-neutral-50 dark:bg-dark-backgroud shadow-xl rounded-xl">
        <HomeBlogSection />
      </div>
    </div>
  );
};

export default Home;

//shadow-2xl p-5 rounded-2xl
