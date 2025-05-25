import {useRef, useState} from "react";
import { useNavigate } from "react-router-dom";
import axios  from "axios";

function Login() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const userNameInfo = useRef<HTMLInputElement>(null);
    const passwordInfo = useRef<HTMLInputElement>(null);
    const emailInfo = useRef<HTMLInputElement>(null);

    const LoginRequest = async () =>{    

      const FormData ={
        userName: userNameInfo.current?.value || '',
        password: passwordInfo.current?.value || '',
        email: emailInfo.current?.value || '',
      }

      console.log(FormData);
      try{
        const response = await axios.post("/api/login", FormData);
        console.log(response.data);
        return response.data;
      }catch(error){
        console.error("❌ DATABASE ERROR:", error);
        return null;
      }
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      const userData = await LoginRequest();

      if(userData){
        console.log("Login successful", userData);
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        navigate("/");
      }else{
        console.log("Login failed");
        navigate("/login");
      }
    }

    return (
      <div className="container d-flex justify-content-center">
        <div className="card p-4" style={{ width: "400px" }}>
          <h2 className="text-center-mb-4">LOGIN</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="User" className="form-label">
                User
              </label>
              <input
                type="User"
                className="form-control"
                id="User"
                placeholder="Sensor123"
                ref={userNameInfo}
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
                ref={emailInfo}
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
                ref={passwordInfo}
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