function NavBar() {
  return (
  <div className="container mt-4">
    <nav className="navbar navbar-expand-lg shadow rounded" style={{marginBottom: "5dvh"}}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" fill="currentColor" className="bi bi-textarea-t" viewBox="0 0 16 16">
          <path d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"/>
          <path d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386z"/>
        </svg>

        </a>
        <button
          style={{color: "var(--text-color)"}}
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        />

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" aria-current="page" href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-house-door-fill me-2"
                  viewBox="0 0 16 16"
                >
                  <path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
                </svg>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/rForm">
                <i className="bi bi-person-plus-fill me-2"></i>
                Register
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/Login">
                <i className="bi bi-person-plus-fill me-2"></i>
                Login
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/ToDoForm">
                <i className="bi bi-check2-square me-2"></i>
                Create New Pending Task
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link d-flex align-items-center" href="/ToDoList">
                <i className="bi bi-check2-square me-2"></i>
                Pending Tasks List
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
  );
}
export default NavBar;
