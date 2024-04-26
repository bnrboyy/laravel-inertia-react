import { Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

export default function Pagination({ links, queryParams }) {
  const [params, setParams] = useState("");

  useEffect(() => {
    const paramName = queryParams["name"] ? "&name=" + queryParams["name"] : "";
    const paramStatus = queryParams["status"]
      ? "&status=" + queryParams["status"]
      : "";
    const paramSortField = queryParams["sort_field"]
      ? "&sort_field=" + queryParams["sort_field"]
      : "";
    const paramSortDir = queryParams["sort_direction"]
      ? "&sort_direction=" + queryParams["sort_direction"]
      : "";
    setParams(paramName + paramStatus + paramSortField + paramSortDir);
  }, [queryParams]);

  return (
    <nav className="text-right mt-4">
      {links?.map((link) => (
        <Link
          key={link.label}
          preserveScroll
          href={link.url + params}
          className={`${link.active ? "bg-gray-300 dark:bg-gray-600 " : ""}${
            !link.url
              ? "!text-gray-300 dark:!text-gray-500 pointer-events-none "
              : "hover:bg-gray-300 dark:hover:bg-gray-600 "
          }px-2 py-2 mx-1 text-sm font-medium leading-5 text-gray-600 dark:text-gray-300 rounded-md focus:outline-none focus:shadow-outline-gray`}
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
}
