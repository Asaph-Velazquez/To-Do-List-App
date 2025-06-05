import { useEffect, useState } from "react";
import axios from "axios";

import ModalBody from "./ModalBody";

interface Task {
  taskid: number;
  taskname: string;
  taskdescription: string;
}

function ToDoList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const userID = localStorage.getItem("userID");
  console.log(userID);

  useEffect(() => {
    axios
      .get(`/api/tasks?userId=${userID}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  }, [userID]);

  console.log("Task ID: " + selectedTask?.taskid);
  console.log(tasks);
  return (
    <main
      className="container"
      style={{ textAlign: "center", padding: "2rem" }}
    >
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {tasks.map((task: Task) => (
          <div className="col" key={task.taskid}>
            <div
              className="card h-100"
              style={{
                backgroundColor: "var(--background-secondary)",
                borderColor: "var(--border-color)",
                color: "var(--text-color)",
              }}
            >
              <div className="card-body d-flex flex-column">
                <h5
                  className="card-title"
                  style={{ color: "var(--accent-primary)" }}
                >
                  {task.taskname}
                </h5>
                <p className="card-text flex-grow-1">{task.taskdescription}</p>
                <button
                  type="button"
                  className="btn mt-auto"
                  style={{
                    backgroundColor: "var(--accent-primary)",
                    color: "var(--background-color)",
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#modalActivation"
                  onClick={() => setSelectedTask(task)}
                >
                  Task Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="modal fade"
        id="modalActivation"
        aria-labelledby="modalActivationLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div
            className="modal-content"
            style={{
              backgroundColor: "var(--background-secondary)",
              color: "var(--text-color)",
            }}
          >
            <div className="modal-header border-secondary">
              <h1 className="modal-title fs-5" id="modalActivationLabel">
                {selectedTask?.taskname}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {selectedTask?.taskid && (
                <ModalBody taskId={selectedTask.taskid} />
              )}
            </div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "var(--accent-secondary)",
                  color: "var(--background-color)",
                }}
                data-bs-dismiss="modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-trash"
                  viewBox="0 0 16 16"
                >
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                </svg>
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--background-color)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-pencil-square"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                  <path
                    fill-rule="evenodd"
                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--background-color)",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-reply"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM7.8 10.386q.103 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ToDoList;
