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

  const userData = localStorage.getItem("userID");

  useEffect(() => {
    axios.get(`/api/tasks?userId=${userData}`)
      .then(response => setTasks(response.data))
      .catch(error => console.error("Error fetching tasks:", error));
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const taskData = {
      userId: userData,
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
  <div className="container-fluid py-4">
    <div className="row justify-content-center">
      <div className="col-12 col-xl-10">
        {/* Main Form */}
        <div className="card shadow-lg border-0">
          <div className="card-header bg-primary text-white py-4">
            <div className="d-flex align-items-center">
              <i className="bi bi-clipboard-check fs-4 me-3"></i>
              <h4 className="mb-0 fw-semibold">Task Details</h4>
            </div>
          </div>
          
          <div className="card-body p-5">
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                {/* Task Name */}
                <div className="col-md-6">
                  <label htmlFor="FormTaskName" className="form-label fw-semibold">
                    <i className="bi bi-tag-fill text-primary me-2"></i>
                    Task Name
                  </label>
                  <input 
                    type="text" 
                    className="form-control border-2" 
                    id="FormTaskName" 
                    ref={taskNameInfo} 
                    placeholder="Enter task name"
                    required 
                  />
                </div>

                {/* Category */}
                <div className="col-md-6">
                  <label htmlFor="FormCategory" className="form-label fw-semibold">
                    <i className="bi bi-folder-fill text-warning me-2"></i>
                    Category
                  </label>
                  <input 
                    type="text" 
                    className="form-control border-2" 
                    id="FormCategory" 
                    ref={taskCategoryInfo} 
                    placeholder="Work, Personal, Studies..."
                  />
                </div>

                {/* Description */}
                <div className="col-12">
                  <label htmlFor="FormDescription" className="form-label fw-semibold">
                    <i className="bi bi-card-text text-info me-2"></i>
                    Description
                  </label>
                  <textarea 
                    className="form-control border-2" 
                    id="FormDescription" 
                    ref={descriptionInfo} 
                    rows={4} 
                    placeholder="Describe task details..."
                    required
                  ></textarea>
                </div>

                {/* Due Date */}
                <div className="col-md-4">
                  <label htmlFor="FormDate" className="form-label fw-semibold">
                    <i className="bi bi-calendar-event text-danger me-2"></i>
                    Due Date
                  </label>
                  <input 
                    type="date" 
                    className="form-control border-2" 
                    id="FormDate" 
                    ref={taskDateInfo} 
                    required 
                  />
                </div>

                {/* Priority */}
                <div className="col-md-4">
                  <label htmlFor="FormPriority" className="form-label fw-semibold">
                    <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                    Priority
                  </label>
                  <select className="form-select border-2" id="FormPriority" ref={taskPriorityInfo} required>
                    <option value="">Select priority</option>
                    <option value="High">🔴 High</option>
                    <option value="Medium">🟡 Medium</option>
                    <option value="Low">🟢 Low</option>
                  </select>
                </div>

                {/* Status */}
                <div className="col-md-4">
                  <label htmlFor="FormStatus" className="form-label fw-semibold">
                    <i className="bi bi-gear-fill text-success me-2"></i>
                    Status
                  </label>
                  <select className="form-select border-2" id="FormStatus" ref={taskStatusInfo} required>
                    <option value="">Select status</option>
                    <option value="Pending">⏳ Pending</option>
                    <option value="In Progress">🔄 In Progress</option>
                    <option value="Completed">✅ Completed</option>
                  </select>
                </div>

                {/* Attachments */}
                <div className="col-12">
                  <label htmlFor="FormAttachments" className="form-label fw-semibold">
                    <i className="bi bi-paperclip text-secondary me-2"></i>
                    Attachments
                  </label>
                  <div className="input-group">
                    <span className="input-group-text bg-light border-2">
                      <i className="bi bi-cloud-upload"></i>
                    </span>
                    <input 
                      type="file" 
                      className="form-control border-2" 
                      id="FormAttachments" 
                      ref={taskAttachmentsInfo} 
                      multiple 
                    />
                  </div>
                  <div className="form-text text-muted">
                    <i className="bi bi-info-circle me-1"></i>
                    You can select multiple files
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="row mt-5">
                <div className="col-12 text-center">
                  <button 
                    type="submit" 
                    className="btn btn-primary px-4 py-2 rounded-pill shadow-sm"
                    style={{
                      background: 'linear-gradient(45deg, #007bff, #0056b3)',
                      border: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="bi bi-check-circle-fill me-2"></i>
                    Create Task
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
);
}

export default ToDohtmlForm;
