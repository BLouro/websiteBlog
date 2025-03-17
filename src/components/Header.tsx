import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

interface NavItem {
  name: string;
  path: string;
}

interface HomeConfig {
  siteTitle: string;
}

const Header: React.FC = () => {
  const [navigation, setNavigation] = useState<NavItem[]>([]);
  const [homeConfig, setHomeConfig] = useState<HomeConfig | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    import("../content/config.json").then((config) => setNavigation(config.navigation));
  }, []);

  useEffect(() => {
    import("../content/config.json").then((config) => setHomeConfig(config));
  }, []);

  return (
    <header>
      <nav className="bg-slate-400 dark:bg-dark-header text-white p-5">
        <div className="grid grid-cols-2 gap-4 items-center">
          
          <div className="flex justify-start">
            <Link to="/">
              <h1 className="text-slate-50 dark:text-slate-100 text-5xl font-extrabold">
                {homeConfig?.siteTitle}
              </h1>
            </Link>
          </div>

          <div className="flex justify-end lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-3xl mr-4"
            >
              &#9776;
            </button>
            <ThemeToggle />
          </div>

          <div className="hidden lg:flex justify-end items-center gap-4">
            {navigation.map((item, index) => (
              <Link key={index} to={item.path} className="text-xl m-1 align-middle">
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="lg:hidden bg-slate-400 dark:bg-dark-header text-white p-5">
          <div className="flex flex-col items-center">
            {navigation.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-xl mb-2"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
