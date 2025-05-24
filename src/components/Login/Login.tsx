function Login() {
    return (
      <div className="container d-flex justify-content-center">
        <div className="card p-4" style={{ width: "400px" }}>
          <h2 className="text-center-mb-4">LOGIN</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="User" className="form-label">
                User
              </label>
              <input
                type="User"
                className="form-control"
                id="User"
                placeholder="Sensor123"
              ></input>
            </div>
  
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="User@gmail.com"
              ></input>
            </div>
  
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder=""
              ></input>
            </div>
            <button type="submit" className="btn btn-primary w-100 d-flex justify-content-center">
                Login
            </button>
          </form>
        </div>
      </div>
    );
  }
  
  export default Login;