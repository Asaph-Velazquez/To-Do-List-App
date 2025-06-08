import { useRef, useState, useEffect } from "react";
import axios from "axios";

function TaskEdit() {
    // Refs para los campos del formulario
    const taskNameInfo = useRef<HTMLInputElement>(null);
    const descriptionInfo = useRef<HTMLTextAreaElement>(null);
    const taskDateInfo = useRef<HTMLInputElement>(null);
    const taskPriorityInfo = useRef<HTMLSelectElement>(null);
    const taskStatusInfo = useRef<HTMLSelectElement>(null);
    const taskCategoryInfo = useRef<HTMLInputElement>(null);
    const taskAttachmentsInfo = useRef<HTMLInputElement>(null);
  
    // Estado para la tarea
    const [task, setTask] = useState<{
      taskname: string;
      taskdescription: string;
      taskdate: string;
      taskpriority: string;
      taskstatus: string;
      taskcategory: string;
      taskattachments: string;
    } | null>(null);
    
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const taskId = localStorage.getItem("taskID");
    console.log("Task ID:", taskId);

    // Alert
    const [alert, setAlert] = useState<{type: string, message: string}|null>(null);

    useEffect(() => {
      if (!taskId) {
        setError("No task ID found");
        setLoading(false);
        return;
      }

      const fetchTask = async () => {
        try {
          const response = await axios.get(`/api/tasks/${taskId}`);
          
          if (response.data) {
            setTask(response.data);
            
            // Formatear la fecha para el input date (si es necesario)
            const formattedDate = response.data.taskdate 
              ? new Date(response.data.taskdate).toISOString().split('T')[0]
              : '';
            
            // Asignar valores a los campos del formulario
            if (taskNameInfo.current) taskNameInfo.current.value = response.data.taskname || '';
            if (descriptionInfo.current) descriptionInfo.current.value = response.data.taskdescription || '';
            if (taskDateInfo.current) taskDateInfo.current.value = formattedDate;
            if (taskPriorityInfo.current) taskPriorityInfo.current.value = response.data.taskpriority || '';
            if (taskStatusInfo.current) taskStatusInfo.current.value = response.data.taskstatus || '';
            if (taskCategoryInfo.current) taskCategoryInfo.current.value = response.data.taskcategory || '';
            if (taskAttachmentsInfo.current) taskAttachmentsInfo.current.value = response.data.taskattachments || '';
          }
        } catch (err) {
          console.error("Error fetching task:", err);
          setError("Failed to load task data");
        } finally {
          setLoading(false);
        }
      };

      fetchTask();
    }, [taskId]);

    if (loading) {
      return <div className="text-center py-5">Loading task data...</div>;
    }

    if (error) {
      return <div className="alert alert-danger text-center py-5">{error}</div>;
    }

    if (!task) {
      return <div className="alert alert-warning text-center py-5">Task not found</div>;
    }
    
    return (
        <div className="container-fluid py-3 py-md-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 col-xl-6">
            {/* Main Form Card */}
            <div className="card shadow-sm border-0">
              <div className="card-header bg-primary text-white py-3">
                <div className="d-flex align-items-center">
                  <i className="bi bi-clipboard-check fs-4 me-3"></i>
                  <h4 className="mb-0 fw-semibold">Edit Task</h4>
                </div>
              </div>
              
              <div className="card-body p-3 p-md-4">
                <form>
                  <div className="row g-3">
                    {/* Task Name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="FormTaskName" className="form-label fw-medium">
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
                    <div className="col-12 col-md-6">
                      <label htmlFor="FormCategory" className="form-label fw-medium">
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
                      <label htmlFor="FormDescription" className="form-label fw-medium">
                        <i className="bi bi-card-text text-info me-2"></i>
                        Description
                      </label>
                      <textarea 
                        className="form-control border-2" 
                        id="FormDescription" 
                        ref={descriptionInfo}
                        rows={3} 
                        placeholder="Describe task details..."
                        required
                      ></textarea>
                    </div>
    
                    {/* Due Date */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <label htmlFor="FormDate" className="form-label fw-medium">
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
                    <div className="col-12 col-sm-6 col-md-4">
                      <label htmlFor="FormPriority" className="form-label fw-medium">
                        <i className="bi bi-exclamation-triangle-fill text-warning me-2"></i>
                        Priority
                      </label>
                      <select 
                        className="form-select border-2" 
                        id="FormPriority" 
                        ref={taskPriorityInfo}
                        required
                      >
                        <option value="">Select priority</option>
                        <option value="High">🔴 High</option>
                        <option value="Medium">🟡 Medium</option>
                        <option value="Low">🟢 Low</option>
                      </select>
                    </div>
    
                    {/* Status */}
                    <div className="col-12 col-sm-6 col-md-4">
                      <label htmlFor="FormStatus" className="form-label fw-medium">
                        <i className="bi bi-gear-fill text-success me-2"></i>
                        Status
                      </label>
                      <select 
                        className="form-select border-2" 
                        id="FormStatus" 
                        ref={taskStatusInfo}
                        required
                      >
                        <option value="">Select status</option>
                        <option value="Pending">⏳ Pending</option>
                        <option value="In Progress">🔄 In Progress</option>
                        <option value="Completed">✅ Completed</option>
                      </select>
                    </div>
    
                    {/* Attachments */}
                    <div className="col-12">
                      <label htmlFor="FormAttachments" className="form-label fw-medium">
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
                      <small className="form-text text-muted">
                        <i className="bi bi-info-circle me-1"></i>
                        You can select multiple files (max 5MB each)
                      </small>
                    </div>
                  </div>
    
                  {/* Submit Button */}
                  <div className="row mt-4">
                    <div className="col-12 text-center">
                      <button 
                        type="submit" 
                        className="btn btn-primary px-4 py-2 rounded-pill shadow-sm w-100 w-md-auto"
                      >
                        <i className="bi bi-check-circle-fill me-2"></i>
                        Update Task
                      </button>
                      <br />
                      <br />
                      {alert && (
                        <div className={`alert alert-${alert.type} text-center`} role="alert">
                          {alert.message}
                        </div>
                      )}
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

export default TaskEdit;