import React, { Fragment, useEffect, useState } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { Button, ConfigProvider, Popconfirm } from "antd";

import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import SelectInput from "@/Components/SelectInput";
import { PROJECT_STATUS_TEXT_MAP, PROJECT_STATUS_CLASS_MAP } from "@/constants";

const text = "Are you sure to delete this project?";
const description = "Delete the project";
const buttonWidth = 80;

export default function Index({ auth, projects, queryParams = null, success, dir_path }) {
  queryParams = queryParams || {};

  useEffect(() => {
    console.log(dir_path)
  }, []);

  const searchFieldChange = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }

    router.get(route("project.index", queryParams));
  };

  const onKeyUp = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChange(name, e.target.value);
  };

  const sortChange = (name) => {
    if (queryParams.sort_field === name) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("project.index", queryParams));
  };

  const deleteProject = (id) => {
    console.log(id);
    router.delete(route("project.destroy", id));
  };

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Projects
          </h2>
          <Link
            className="bg-emerald-500 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded"
            href={route("project.create")}
            // to={route("project.create")}
          >
            Create Project
          </Link>
        </div>
      }
    >
      <Head title="Projects" />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          {success && (
            <div className="bg-emerald-500 py-2 px-4 text-white rounded mb-4">
              {success}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="overflow-auto">
                <table className="w-full text-sm text-left rtl:text-right text-grayy-500 dark:text-gray-400 border-collapse">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600">
                    <tr className="text-nowrap">
                      <th onClick={(e) => sortChange("id")}>
                        <ChevronSort
                          queryParams={queryParams}
                          name="ID"
                          sortField={"id"}
                        />
                      </th>
                      <th className="px-3 py-3">Image</th>
                      <th onClick={(e) => sortChange("name")}>
                        <ChevronSort
                          queryParams={queryParams}
                          name="name"
                          sortField={"name"}
                        />
                      </th>
                      <th onClick={(e) => sortChange("status")}>
                        <ChevronSort
                          queryParams={queryParams}
                          name="status"
                          sortField={"status"}
                        />
                      </th>
                      <th onClick={(e) => sortChange("created_at")}>
                        <ChevronSort
                          queryParams={queryParams}
                          name="Crated Date"
                          sortField={"created_at"}
                        />
                      </th>
                      <th onClick={(e) => sortChange("due_date")}>
                        <ChevronSort
                          queryParams={queryParams}
                          name="Due Date"
                          sortField={"due_date"}
                        />
                      </th>
                      <th className="px-3 py-3">Created By</th>
                      <th className="px-3 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b border-gray-300 dark:border-gray-600">
                    <tr className="text-nowrap">
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3">
                        <TextInput
                          className={"w-full"}
                          defaultValue={queryParams.name}
                          placeholder={"Search name"}
                          onBlur={(e) =>
                            searchFieldChange("name", e.target.value)
                          }
                          onKeyUp={(e) => onKeyUp("name", e)}
                        />
                      </th>
                      <th className="px-3 py-3">
                        <SelectInput
                          className={"w-full"}
                          defaultValue={queryParams.status}
                          onChange={(e) =>
                            searchFieldChange("status", e.target.value)
                          }
                        >
                          <option value="">All</option>
                          <option value="pending">Pending</option>
                          <option value="in_progress">In Progress</option>
                          <option value="completed">Completed</option>
                        </SelectInput>
                      </th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                      <th className="px-3 py-3"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {projects.data &&
                      projects.data.map((project) => (
                        <tr
                          key={project.id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        >
                          <td className="px-3 py-2">{project.id}</td>
                          <td className="px-3 py-2">
                            <img
                              loading="lazy"
                              className="cursor-pointer"
                              src={project.image_path}
                              style={{ width: "60px", borderRadius: "10px" }}
                            />
                          </td>
                          <td className="px-3 py-2 text-gray-900 dark:text-gray-200 hover:underline">
                            <Link href={route("project.show", project.id)}>
                              {project.name}
                            </Link>
                          </td>
                          <td className="px-3 py-2">
                            <span
                              className={`px-2 py-1 rounded text-white ${
                                PROJECT_STATUS_CLASS_MAP[project.status]
                              }`}
                            >
                              {PROJECT_STATUS_TEXT_MAP[project.status]}
                            </span>
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.created_at}
                          </td>
                          <td className="px-3 py-2 text-nowrap">
                            {project.due_date}
                          </td>
                          <td className="px-3 py-2">
                            {project.createdBy.name}
                          </td>
                          <td className="px-3 py-2">
                            <Link
                              href={route("project.edit", project.id)}
                              className="font-medium text-blue-500 hover:text-blue-600 mx-1"
                            >
                              Edit
                            </Link>
                            {/* <Link
                              href={route("project.destroy", project.id)}
                              className="font-medium text-red-500 hover:text-red-600 mx-1"
                            >
                              Delete
                            </Link> */}
                            <Popconfirm
                              placement="left"
                              title={text}
                              description={description}
                              onConfirm={(e) => deleteProject(project.id)}
                              okText="Yes"
                              cancelText="No"
                            >
                              <button className="font-medium text-red-500 hover:text-red-600 mx-1">
                                Delete
                              </button>
                            </Popconfirm>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                links={projects.meta.links}
                queryParams={queryParams}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}

const ChevronSort = ({ queryParams, name, sortField }) => {
  return (
    <div className="px-3 py-3 flex items-center justify-between gap-1 cursor-pointer">
      {name}
      <div>
        <ChevronUpIcon
          className={
            "w-4 " +
            (queryParams.sort_field == sortField &&
            queryParams.sort_direction == "asc"
              ? "text-white"
              : "")
          }
        />
        <ChevronDownIcon
          className={
            "w-4 -mt-2 " +
            (queryParams.sort_field == sortField &&
            queryParams.sort_direction == "desc"
              ? "text-white"
              : "")
          }
        />
      </div>
    </div>
  );
};
