import React from "react";
import { useTranslate } from "react-translate";

function Footer() {
  const t = useTranslate("common");

  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {t("footer.description")}
      </div>
    </footer>
  );
}

export default Footer;
