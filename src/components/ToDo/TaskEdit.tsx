import { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function TaskEdit() {
  // Estado para los datos del formulario
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    taskName: '',
    taskDescription: '',
    taskDate: '',
    taskPriority: '',
    taskStatus: '',
    taskCategory: '',
    taskAttachments: '',
    userId: '' // Añadido para compatibilidad con tu backend
  });

  // Estados para manejo de la UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alert, setAlert] = useState<{type: 'success' | 'danger', message: string} | null>(null);

  const taskId = localStorage.getItem("taskID");
  const userId = localStorage.getItem("userID"); // Asumiendo que guardas el userID en localStorage

  // Fetch task data
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
          // Format date for date input
          const formattedDate = response.data.taskdate 
            ? new Date(response.data.taskdate).toISOString().split('T')[0]
            : '';
          
          setFormData({
            taskName: response.data.taskname || '',
            taskDescription: response.data.taskdescription || '',
            taskDate: formattedDate,
            taskPriority: response.data.taskpriority || '',
            taskStatus: response.data.taskstatus || '',
            taskCategory: response.data.taskcategory || '',
            taskAttachments: response.data.taskattachments || '',
            userId: response.data.userid || userId || ''
          });
        }
      } catch (err) {
        console.error("Error fetching task:", err);
        setError("Failed to load task data");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [taskId, userId]);

  // Handle input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle file input changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // Aquí puedes manejar la subida de archivos si es necesario
      setFormData(prev => ({
        ...prev,
        taskAttachments: e.target.files?.[0]?.name || prev.taskAttachments
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskId || isSubmitting) return;
  
    // Validación de campos requeridos como en tu backend
    if (
      !formData.taskName ||
      !formData.taskDescription ||
      !formData.taskDate ||
      !formData.taskPriority ||
      !formData.taskStatus
    ) {
      setAlert({
        type: 'danger',
        message: 'Fields taskName, taskDescription, taskDate, taskPriority and taskStatus are required'
      });
      return;
    }
  
    setIsSubmitting(true);
    setAlert(null);
  
    try {
      const response = await axios.put(
        `/api/tasks/${taskId}`,
        {
          taskName: formData.taskName,
          taskDescription: formData.taskDescription,
          taskDate: formData.taskDate,
          taskPriority: formData.taskPriority,
          taskStatus: formData.taskStatus,
          taskCategory: formData.taskCategory,
          taskAttachments: formData.taskAttachments,
          userId: formData.userId
        }
      );
      
      setAlert({
        type: 'success',
        message: response.data.message || 'Task updated successfully!'
      });
      
      // Redirigir después de 2 segundos para que el usuario pueda ver el mensaje de éxito
      setTimeout(() => {
        navigate('/ToDoList');
      }, 2000);
      
      // Actualizar con los datos devueltos por el servidor
      const formattedDate = response.data.task?.taskdate 
        ? new Date(response.data.task.taskdate).toISOString().split('T')[0]
        : '';
      
      setFormData(prev => ({
        ...prev,
        taskName: response.data.task?.taskname || prev.taskName,
        taskDescription: response.data.task?.taskdescription || prev.taskDescription,
        taskDate: formattedDate,
        taskPriority: response.data.task?.taskpriority || prev.taskPriority,
        taskStatus: response.data.task?.taskstatus || prev.taskStatus,
        taskCategory: response.data.task?.taskcategory || prev.taskCategory,
        taskAttachments: response.data.task?.taskattachments || prev.taskAttachments
      }));
      
    } catch (err: any) {
      console.error("Error updating task:", err);
      setAlert({
        type: 'danger',
        message: err.response?.data?.error || 'Failed to update task. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-5">Loading task data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger text-center py-5">{error}</div>;
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
              <form onSubmit={handleSubmit}>
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
                      name="taskName"
                      value={formData.taskName}
                      onChange={handleInputChange}
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
                      name="taskCategory"
                      value={formData.taskCategory}
                      onChange={handleInputChange}
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
                      name="taskDescription"
                      value={formData.taskDescription}
                      onChange={handleInputChange}
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
                      name="taskDate"
                      value={formData.taskDate}
                      onChange={handleInputChange}
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
                      name="taskPriority"
                      value={formData.taskPriority}
                      onChange={handleInputChange}
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
                      name="taskStatus"
                      value={formData.taskStatus}
                      onChange={handleInputChange}
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
                        name="taskAttachments"
                        onChange={handleFileChange}
                        multiple
                      />
                    </div>
                    <small className="form-text text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      Current: {formData.taskAttachments || 'No attachments'}
                    </small>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="row mt-4">
                  <div className="col-12 text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-4 py-2 rounded-pill shadow-sm w-100 w-md-auto"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle-fill me-2"></i>
                          Update Task
                        </>
                      )}
                    </button>
                    <br />
                    <br />
                    {alert && (
                      <div
                        className={`alert alert-${alert.type} text-center`}
                        role="alert"
                      >
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