import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
    taskID: number;
    taskName: string;
    taskDescription: string;
    taskDate: string;
    taskPriority: string;
    taskStatus: string;
    taskCategory: string;
    taskAttachments: string;
}

interface ModalBodyProps {
    taskId: number;
}

function ModalBody({ taskId }: ModalBodyProps) {
    const [task, setTask] = useState<Task | null>(null);

    useEffect(() => {
      axios.get(`/api/tasks/${taskId}`)
        .then(response => {
            setTask(response.data);
            console.log(response.data);
        })
        .catch(error => console.error("Error fetching tasks:", error));
    }, [taskId]);
    
    if (!task) return <div>Downloading...</div>;
    
    return (
      <main>
        <div className="container">
          <div>
            <h1>{task.taskName}</h1>
            <p>{task.taskDescription}</p>
            <div className="task-details">
              <p><strong>Fecha:</strong> {task.taskDate}</p>
              <p><strong>Prioridad:</strong> {task.taskPriority}</p>
              <p><strong>Estado:</strong> {task.taskStatus}</p>
              <p><strong>Categoría:</strong> {task.taskCategory}</p>
              {task.taskAttachments && (
                <p><strong>Adjuntos:</strong> {task.taskAttachments}</p>
              )}
            </div>
          </div>
        </div>
      </main>
    );
}

export default ModalBody;   