import React from "react";
import { useTranslate } from "react-translate";
import simpleSvgPlaceholder from "@cloudfour/simple-svg-placeholder";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const List = ({ jsonData }) => {
  const t = useTranslate("common");

  const { data: projects, included: includedProjects } = jsonData;

  const listData = [];
  let listDataOrganization = [];

  projects.forEach((project) => {
    includedProjects.forEach((includedProject) => {
      const projectId =
        project.relationships?.organizational_anchoring?.data?.id;
      if (projectId === includedProject.id) {
        listDataOrganization = includedProject.attributes.name;
      }
    });
    listData.push({
      id: project.id,
      name: project.attributes.title,
      org: listDataOrganization,
    });
  });

  if (!listData || listData.length === 0)
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
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {listData.map((item) => {
            return (
              <tr key={item.id}>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full"
                        src={simpleSvgPlaceholder({
                          width: 100,
                          height: 100,
                          text: item.org,
                        })}
                        alt=""
                      />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">
                        <Link to="#" href="#" className="hover:text-indigo-600">
                          {item.name}
                        </Link>
                      </div>
                      {item.status && (
                        <div className="text-sm text-gray-500 truncate">
                          {item.status}
                        </div>
                      )}
                    </div>
                  </div>
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
