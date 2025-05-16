function ToDohtmlForm() {
  return (
    <main className="d-flex justify-content-center align-items-center" style={{marginTop: "5dvh"}}>
      <form className="container">
        <div className="row">
          {/* Task Name */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormTaskName" className="form-label">Task Name</label>
            <input type="text" className="form-control" id="FormTaskName" required />
          </div>
 
 
          {/* Description */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormDescription" className="form-label">Description (Optional)</label>
            <textarea className="form-control" id="FormDescription" rows={3}></textarea>
          </div>

          {/* Due Date */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormDate" className="form-label">Due Date</label>
            <input type="date" className="form-control" id="FormDate" required />
          </div>

          {/* Priority */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormPriority" className="form-label">Priority</label>
            <select className="form-control" id="FormPriority" required>
              <option value="">Select priority</option>
              <option value="Alta">Alta</option>
              <option value="Media">Media</option>
              <option value="Baja">Baja</option>
            </select>
          </div>

          {/* Status */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormStatus" className="form-label">Status</label>
            <select className="form-control" id="FormStatus" required>
              <option value="">Select status</option>
              <option value="Pendiente">Pendiente</option>
              <option value="En progreso">En progreso</option>
              <option value="Completada">Completada</option>
            </select>
          </div>

          {/* Category */}
          <div className="col-md-4 mb-3">
            <label htmlFor="FormCategory" className="form-label">Category (Optional)</label>
            <input type="text" className="form-control" id="FormCategory" placeholder="Trabajo, Personal, Estudios..." />
          </div>

          <div className="col-md-4 mb-3"></div>
          {/* Attachments */}
          <div className="col-md-9 mb-3" style={{ marginLeft: "auto", marginRight: "auto" }}>
            <label htmlFor="FormAttachments" className="form-label d-flex justify-content-center">Attachments (Optional)</label>
            <input type="file" className="form-control" id="FormAttachments" multiple />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-3 d-flex justify-content-center">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </main>
  );
}

export default ToDohtmlForm;
