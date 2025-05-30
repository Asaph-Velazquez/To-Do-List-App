import { useEffect, useState } from "react";
import axios from "axios";

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const userID = localStorage.getItem("userID");
  console.log(userID);

  useEffect(() => {
    axios.get(`/api/tasks?userId=${userID}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, [userID]);

  return (
    <main className="container" style={{ textAlign: "center", padding: "2rem" }}>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
        {tasks.map((task: any) => (
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
                <h5 className="card-title" style={{ color: "var(--accent-primary)" }}>
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
                >
                  Task Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="modal fade" id="modalActivation" aria-labelledby="modalActivationLabel" aria-hidden="true">
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
                Modal title
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">...</div>
            <div className="modal-footer border-secondary">
              <button
                type="button"
                className="btn"
                style={{
                  backgroundColor: "var(--accent-secondary)",
                  color: "var(--background-color)"
                }}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button 
                type="button" 
                className="btn"
                style={{
                  backgroundColor: "var(--accent-primary)",
                  color: "var(--background-color)"
                }}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default ToDoList;
