import React from "react";
import { useTranslate } from "react-translate";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const List = (props) => {
  const t = useTranslate("common");

  const { projects } = props;
  if (!projects || projects.length === 0)
    return <p>{t("No projects, sorry")}</p>;
  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-200 table-fixed">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12"
            >
              {t("list.title")}
            </th>
            <th scope="col" className="px-6 py-3 bg-gray-50">
              <span className="sr-only">{t("list.show")}</span>
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {projects.map((project) => {
            return (
              <tr key={project.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={simpleSvgPlaceholder({
                          width: 100,
                          height: 100,
                          text: "Placeholder",
                        })}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 truncate">
                        {project.attributes.title}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {project.attributes.status_additional &&
                          project.attributes.status_additional.value}
                      </div>
                    </div>
                  </div>
                </td>
                {/* <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          Regional Paradigm Technician
                        </div>
                        <div className="text-sm text-gray-500">
                          Optimization
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Active
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        Admin
                      </td> */}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <Link
                    to="#"
                    href="#"
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    {t("Vis")}
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default List;
