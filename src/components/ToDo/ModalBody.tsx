import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
    taskid: number;
    taskname: string;
    taskdescription: string;
    taskdate: string;
    taskpriority: string;
    taskstatus: string;
    taskcategory: string;
    taskattachments: string;
}

interface ModalBodyProps {
    taskId: number;
}

function ModalBody({ taskId }: ModalBodyProps) {
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
      console.log("Fetching task with ID:", taskId);
      axios.get(`/api/tasks/${taskId}`)
        .then(response => {
            console.log("Response from server:", response.data);
            setTask(response.data);
        })
        .catch(error => {
            console.error("Error fetching task:", error);
            console.error("Error details:", error.response?.data);
        });
    }, [taskId]);
    const taskData = task?.taskid || "No task found";

    localStorage.setItem("taskID", JSON.stringify(taskData));

    console.log(taskData);

    if (!task) return <div>Loading...</div>;
     
    return (
      <main>
        <div className="container">
          <div>
            <p>{task.taskdescription}</p>
            <div className="task-details">
              <p><strong>Date:</strong> {task.taskdate}</p>
              <p><strong>Priority:</strong> {task.taskpriority}</p>
              <p><strong>Status:</strong> {task.taskstatus}</p>
              <p><strong>Category:</strong> {task.taskcategory}</p>
              {task.taskattachments && (
                <p><strong>Attachments:</strong> {task.taskattachments}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
}

export default ModalBody;   