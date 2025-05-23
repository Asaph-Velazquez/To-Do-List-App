import { useRef, useEffect, useState  } from "react";
import axios from "axios"

function ToDohtmlForm() {
  const taskNameInfo = useRef<HTMLInputElement>(null);
  const descriptionInfo = useRef<HTMLTextAreaElement>(null);
  const taskDateInfo = useRef<HTMLInputElement>(null);
  const taskPriorityInfo = useRef<HTMLSelectElement>(null);
  const taskStatusInfo = useRef<HTMLSelectElement>(null);
  const taskCategoryInfo = useRef<HTMLInputElement>(null);
  const taskAttachmentsInfo = useRef<HTMLInputElement>(null);

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/api/tasks")
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      userId: 1,
      taskName: taskNameInfo?.current?.value,
      taskDescription: descriptionInfo?.current?.value,
      taskDate: taskDateInfo?.current?.value,
      taskPriority: taskPriorityInfo?.current?.value,
      taskStatus: taskStatusInfo?.current?.value,
      taskCategory: taskCategoryInfo?.current?.value,
      taskAttachments: taskAttachmentsInfo?.current?.value,
    }
    console.log(taskData);

    axios.post("/api/tasks", taskData)
      .then(response => {
        console.log("Task created successfully:", response.data);
        axios.get("/api/tasks")
          .then(response => setTasks(response.data))
          .catch(error => console.error("Error fetching tasks:", error));
      })
      .catch(error => {
        console.error("Error creating task:", error);
      });
  }

  return (
    <main className="d-flex justify-content-center align-items-center" style={{textAlign: "center"}}>
      <br />
      <form className="container" onSubmit={handleSubmit}>
        <div className="row">
          {/* Task Name */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormTaskName" className="form-label">Task Name</label>
            <input type="text" className="form-control" id="FormTaskName" ref={taskNameInfo} required />
          </div>
 
          {/* Description */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormDescription" className="form-label">Description</label>
            <textarea className="form-control" id="FormDescription" ref={descriptionInfo} rows={3} required></textarea>
          </div>

          {/* Due Date */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormDate" className="form-label">Due Date</label>
            <input type="date" className="form-control" id="FormDate" ref={taskDateInfo} required />
          </div>

          {/* Priority */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormPriority" className="form-label">Priority</label>
            <select className="form-control" id="FormPriority" ref={taskPriorityInfo} required>
              <option value="">Select priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormStatus" className="form-label">Status</label>
            <select className="form-control" id="FormStatus" ref={taskStatusInfo} required>
              <option value="">Select status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormCategory" className="form-label">Category</label>
            <input type="text" className="form-control" id="FormCategory" ref={taskCategoryInfo} placeholder="Work, Personal, Studies..." />
          </div>

          <div className="col-md-4 mb-3"></div>
          {/* Attachments */}
          <div className="col-md-9 mb-3" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <label htmlFor="FormAttachments" className="form-label d-flex justify-content-center">Attachments</label>
            <input type="file" className="form-control" id="FormAttachments" ref={taskAttachmentsInfo} multiple />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-2 d-flex justify-content-center" style={{textAlign: "center", alignContent: "center"}}>
          <button type="submit" className="btn btn-primary" >Submit</button>
        </div>
      </form>
    </main>
  );
}

export default ToDohtmlForm;
