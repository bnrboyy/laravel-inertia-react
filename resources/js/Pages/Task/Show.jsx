import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import { Head } from "@inertiajs/react";
import React, { useEffect } from "react";
import TasksTable from "../Task/TasksTable";

export default function Show({ task, auth, tasks, queryParams = null }) {
  useEffect(() => {
  }, []);

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="w-full flex justify-between items-center">
          <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">
            Task: {task.name}
          </h2>
        </div>
      }
    >
      <Head title={`Tasks: "${task.name}"`} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div>
              <img
                className="w-full h-64 object-cover"
                src={task.image_path}
                alt=""
              />
            </div>
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <div className="grid gap-1 grid-cols-2 mt-2">
                <div>
                  <div>
                    <label className="font-bold text-lg" htmlFor="">
                      Task ID
                    </label>
                    <p className="mt-1">{task.id}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg" htmlFor="">
                      Task Name
                    </label>
                    <p className="mt-1">{task.name}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg" htmlFor="">
                      Task Status
                    </label>
                    <p className="mt-2">
                      <span
                        className={
                          "px-2 py-1 rounded text-white " +
                          TASK_STATUS_CLASS_MAP[task.status]
                        }
                      >
                        {TASK_STATUS_TEXT_MAP[task.status]}
                      </span>
                    </p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg" htmlFor="">
                      Created By
                    </label>
                    <p className="mt-1">{task.createdBy.name}</p>
                  </div>
                </div>
                <div>
                  <div>
                    <label className="font-bold text-lg" htmlFor="">
                      Due Date
                    </label>
                    <p className="mt-1">{task.due_date}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg" htmlFor="">
                      Create Date
                    </label>
                    <p className="mt-1">{task.created_at}</p>
                  </div>
                  <div className="mt-4">
                    <label className="font-bold text-lg" htmlFor="">
                      Updated By
                    </label>
                    <p className="mt-1">{task.updatedBy.name}</p>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <label htmlFor="" className="font-bold text-lg">
                  Task Description
                </label>
                <p className="mt-1">{task.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900 dark:text-gray-100">
              <TasksTable
                tasks={tasks}
                queryParams={{ ...queryParams, id: task.id }}
                resoucePage={"task.show"}
                hideTaskColumn={true}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
