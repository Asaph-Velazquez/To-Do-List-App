import { useState, useEffect, useRef} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function rForm() {
  const navigate = useNavigate();
  // Form refs
  const userNameInfo = useRef<HTMLInputElement>(null);
  const passwordInfo = useRef<HTMLInputElement>(null);
  const emailInfo = useRef<HTMLInputElement>(null);
  const firstNameInfo = useRef<HTMLInputElement>(null);
  const lastNameInfo = useRef<HTMLInputElement>(null);

  //Alert
  const [alert, setAlert] = useState<{type: string, message: string}|null>(null);

  // Validation states
  const [validationErrors, setValidationErrors] = useState({
    username: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  // Validation regex
  const Regex = {
    username: /^[a-zA-Z0-9\s]{3,40}$/,
    password: /^[a-zA-Z0-9#$%&@!()_/-/*+-]{8,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    firstName: /^[a-zA-Z\s]{3,20}$/,
    lastName: /^[a-zA-Z\s]{3,20}$/
  };

  // Validation messages
  const validationMessages = {
    username: 'Username must be 3-40 characters long and contain only letters and numbers',
    password: 'Password must be more than 8 characters',
    email: 'Please enter a valid email address',
    firstName: 'First name must be 3-20 characters long and contain only letters',
    lastName: 'Last name must be 3-20 characters long and contain only letters'
  };

  // Handle input changes
  const handleInputChange = (field: string, value: string) => {
    const isValid = Regex[field as keyof typeof Regex].test(value);
    setValidationErrors(prev => ({
      ...prev,
      [field]: isValid ? '' : validationMessages[field as keyof typeof validationMessages]
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      username: userNameInfo.current?.value || '',
      password: passwordInfo.current?.value || '',
      email: emailInfo.current?.value || '',
      firstName: firstNameInfo.current?.value || '',
      lastName: lastNameInfo.current?.value || ''
    };

    // Validate all fields
    let isValid = true;
    const newErrors = { ...validationErrors };

    Object.keys(formData).forEach(field => {
      const value = formData[field as keyof typeof formData];
      const fieldIsValid = Regex[field as keyof typeof Regex].test(value);
      if (!fieldIsValid) {
        newErrors[field as keyof typeof newErrors] = validationMessages[field as keyof typeof validationMessages];
        isValid = false;
      }
    });

    setValidationErrors(newErrors);

    if (isValid) {
      try {
        const response = await axios.post("/api/users", formData);
        console.log("User registered successfully:", response.data);
        setAlert({
          type: "success",
          message: "User registered successfully!"
        })
        navigate("/login");
        // Handle successful registration (e.g., redirect to login)
      } catch (error) {
        console.error("Error registering user:", error);
        setAlert({
          type: "danger",
          message: "Error registering user please try again!"
        }); 
        // Handle registration error
      }
    }
  };
  return (
    <div className="container d-flex justify-content-center">
      <div className="card p-4" style={{ width: "700px", maxWidth: "90vw" }}>
        <h2 className="text-center mb-4">REGISTER</h2>
        <form className="row g-3" onSubmit={handleSubmit}>
          <div className="col-md-12">
            <label htmlFor="validationServerUsername" className="form-label">
              Username
            </label>
            <input
              ref={userNameInfo}
              type="text"
              className={`form-control ${validationErrors.username ? 'is-invalid' : 'is-valid'}`}
              id="validationServerUsername"
              onChange={(e) => handleInputChange('username', e.target.value)}
              placeholder="Enter your username"
              required
            />
            {validationErrors.username && (
              <div className="invalid-feedback">{validationErrors.username}</div>
            )}
          </div>
  
          <div className="col-md-6">
            <label htmlFor="validationServer01" className="form-label">
              First name
            </label>
            <input
              ref={firstNameInfo}
              type="text"
              className={`form-control ${validationErrors.firstName ? 'is-invalid' : 'is-valid'}`}
              id="validationServer01"
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              placeholder="First name"
              required
            />
            {validationErrors.firstName && (
              <div className="invalid-feedback">{validationErrors.firstName}</div>
            )}
          </div>
  
          <div className="col-md-6">
            <label htmlFor="validationServer02" className="form-label">
              Last name
            </label>
            <input
              ref={lastNameInfo}
              type="text"
              className={`form-control ${validationErrors.lastName ? 'is-invalid' : 'is-valid'}`}
              id="validationServer02"
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              placeholder="Last name"
              required
            />
            {validationErrors.lastName && (
              <div className="invalid-feedback">{validationErrors.lastName}</div>
            )}
          </div>
  
          <div className="col-md-6">
            <label htmlFor="validationServerMail" className="form-label">
              Email
            </label>
            <input
              ref={emailInfo}
              type="email"
              className={`form-control ${validationErrors.email ? 'is-invalid' : 'is-valid'}`}
              id="validationServerMail"
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="user@gmail.com"
              required
            />
            {validationErrors.email && (
              <div className="invalid-feedback">{validationErrors.email}</div>
            )}
          </div>
  
          <div className="col-md-6">
            <label htmlFor="validationServerPassword" className="form-label">
              Password
            </label>
            <input
              ref={passwordInfo}
              type="password"
              className={`form-control ${validationErrors.password ? 'is-invalid' : 'is-valid'}`}
              id="validationServerPassword"
              onChange={(e) => handleInputChange('password', e.target.value)}
              placeholder="Enter password"
              required
            />
            {validationErrors.password && (
              <div className="invalid-feedback">{validationErrors.password}</div>
            )}
          </div>
  
          <div className="col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="termsCheck"
                required
              />
              <label className="form-check-label" htmlFor="termsCheck">
                Agree to terms and conditions 
              </label>
            </div>
          </div>
  
          <div className="col-12">
            <button className="btn btn-primary w-100 d-flex justify-content-center" type="submit">
              Register
            </button>
            <br />
            {alert && (
              <div className={`alert alert-${alert.type} text-center`} role="alert">
                {alert.message}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default rForm;
