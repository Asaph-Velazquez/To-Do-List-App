import { useState } from "react";

function ToDoList() {
  const Task ={
    name: "Task 1",
    description: "Description 1",
    dueDate: "2021-01-01",
    priority: "Alta",
    status: "Pendiente",
    category: "Trabajo",
    attachments: ["attachment1.jpg", "attachment2.png"],
  }


  return (
  <main className="container" style={{textAlign: "center"}}>
    {/* Task Card */}
    <div className="card" style={{width: "18rem;"}}>
      <div className="card-body">
        <h5 className="card-title">{Task.name}</h5>
        <p className="card-text">{Task.description}</p>
        <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="ModalActivationButton">
          Task Details
        </button>
      </div>
    </div>

    {/* Task Modal*/}
    <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            ...
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
      <div className="mb-3">
        <label htmlFor="TaskName" className="form-label">
          Task Name
        </label>
        <input
          type="text"
          className="form-control"
          id="TaskName"
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="Description" className="form-label">
          Description
        </label>
        <input
          type="text"
          className="form-control"
          id="Description"
          disabled
        />
      </div>
      <div className="mb-3">
        <label htmlFor="DueDate" className="form-label">
          Due Date
        </label>
        
      </div>
    </main>
  );
}

export default ToDoList;
