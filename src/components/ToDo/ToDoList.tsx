import { useState } from "react";

function ToDoList() {

  const [Task, setTask] = useState({
    name: "Task 1",
    description: "Description 1",
    dueDate: "2021-01-01",
    priority: "Alta",
    status: "Pendiente",
  });

  return (
    <main className="container" style={{ textAlign: "center", padding: "2rem" }}>

  <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
    {/* Principal Card */}
    <div className="col">
      <div 
        className="card h-100" 
        style={{ 
          backgroundColor: "var(--background-secondary)",
          borderColor: "var(--border-color)",
          color: "var(--text-color)"
        }}
      >
        <div className="card-body d-flex flex-column">
          <h5 className="card-title" style={{ color: "var(--accent-primary)" }}>
            {Task.name}
          </h5>
          <p className="card-text flex-grow-1">{Task.description}</p>
          <button
            type="button"
            className="btn mt-auto"
            style={{
              backgroundColor: "var(--accent-primary)",
              color: "var(--background-color)"
            }}
            data-bs-toggle="modal"
            data-bs-target="#modalActivation"
          >
            Task Details
          </button>
        </div>
      </div>
    </div>

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

  {/* Form */}
  <div className="mt-5" style={{ maxWidth: "600px", margin: "0 auto" }}>
    <div className="mb-3">
      <label htmlFor="TaskName" className="form-label" style={{ color: "var(--text-color)" }}>
        Task Name
      </label>
      <input 
        type="text" 
        className="form-control" 
        id="TaskName" 
        disabled 
        style={{
          backgroundColor: "var(--background-secondary)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="Description" className="form-label" style={{ color: "var(--text-color)" }}>
        Description
      </label>
      <input 
        type="text" 
        className="form-control" 
        id="Description" 
        disabled 
        style={{
          backgroundColor: "var(--background-secondary)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      />
    </div>
    <div className="mb-3">
      <label htmlFor="DueDate" className="form-label" style={{ color: "var(--text-color)" }}>
        Due Date
      </label>
      <input 
        type="date" 
        className="form-control" 
        id="DueDate" 
        style={{
          backgroundColor: "var(--background-secondary)",
          color: "var(--text-color)",
          borderColor: "var(--border-color)"
        }}
      />
    </div>
  </div>
</main>
  );
}

export default ToDoList;
