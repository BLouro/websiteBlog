import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface NavItem {
  name: string;
  path: string;
}

const Header: React.FC = () => {
  const [navigation, setNavigation] = useState<NavItem[]>([]);

  useEffect(() => {
    import("../content/config.json").then((config) => setNavigation(config.navigation));
  }, []);

  return (
    <header>
      <nav className="bg-blue-500 text-white p-4 flex justify-between">
        <h1 className="text-xl">my Blog</h1>
        {navigation.map((item, index) => (
          <Link key={index} to={item.path} style={{ margin: "0 10px" }}>
            {item.name}
          </Link>
        ))}
      </nav>
    </header>
  );
};

export default Header;