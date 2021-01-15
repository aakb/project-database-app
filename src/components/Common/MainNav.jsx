import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslate } from "react-translate";
import Logo from "./Logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

function MainNav({ active }) {
  const t = useTranslate("common");

  function Nav(props) {
    const content = props.navItems.map((item) => (
      <NavLink
        key={item.id}
        to={item.path}
        href={item.path}
        exact={true}
        className="px-3 py-2 rounded-md text-sm font-medium text-gray-300 mr-3 hover:text-white hover:bg-gray-700"
        activeClassName="text-white bg-gray-900"
      >
        {item.title}
      </NavLink>
    ));
    return <div>{content}</div>;
  }
  const navItems = [
    { id: 1, title: t("nav.home"), path: "/" },
    { id: 2, title: t("nav.projects"), path: "/projects" },
    { id: 3, title: t("nav.chart"), path: "/chart" },
  ];

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8 w-8" src={Logo} alt={"Workflow"} />
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Nav navItems={navItems} />
              </div>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">{t("nav.open")}</span>
              <FontAwesomeIcon icon={faBars} className="block h-6 w-6" />
              <FontAwesomeIcon icon={faTimes} className="hidden h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <div className="hidden md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Nav navItems={navItems} />
        </div>
      </div>
    </nav>
  );
}

export default MainNav;
