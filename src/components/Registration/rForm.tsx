import { useState, useEffect, useRef} from "react";
import axios from "axios"

function rForm() {
  {/*Getting values from the form*/ }
  const userNameInfo  = useRef<HTMLInputElement>(null);
  const passwordInfo = useRef<HTMLInputElement>(null);
  const emailInfo = useRef<HTMLInputElement>(null);
  const firstNameInfo = useRef<HTMLInputElement>(null);
  const lastNameInfo = useRef<HTMLInputElement>(null);
  const agreeInfo = document.getElementById("agree")

  {/* Validations*/}
  const Regex = {
    username: /^[a-zA-Z0-9]{3,20}$/,
    password: /^[a-zA-Z0-9]{8,20}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    firstName: /^[a-zA-Z]{3,20}$/,
    lastName: /^[a-zA-Z]{3,20}$/
  };

  const handleSubmit = () => {
    const username = userNameInfo.current?.value || '';
    const password = passwordInfo.current?.value || '';
    const email = emailInfo.current?.value || '';
    const firstName = firstNameInfo.current?.value || '';
    const lastName = lastNameInfo.current?.value || '';

    if (!Regex.username.test(username)) {
      alert("Username is not valid");
      return;
    }
    if (!Regex.password.test(password)) {
      alert("Password is not valid");
      return;
    }
    if (!Regex.email.test(email)) {
      alert("Email is not valid");
      return;
    }
    if (!Regex.firstName.test(firstName)) {
      alert("First name is not valid");
      return;
    }
    if (!Regex.lastName.test(lastName)) {
      alert("Last name is not valid");
      return;
    }
    
  }

  {/*Fetching users from the database*/}
  useEffect(()=>{
    axios.get("/api/users")
  })

  return (
    <div className="container center">
      <form className="row g-3">
         <div className="col-md-12">
          <label htmlFor="validationServerUsername" className="form-form-label d-flex justify-content-center">
            Username
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control is-invalid d-flex justify-content-center"
              id="validationServerUsername"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              required
            />
            <div
              id="validationServerUsernameFeedback"
              className="feedback"
            >
            </div>
          </div>
        </div>


        <div className="col-md-6">
          <label htmlFor="validationServer01" className="form-form-label d-flex justify-content-center">
            {" "}
            First name
          </label>
          <input
            ref={firstNameInfo}
            type="text"
            className="form-control"
            id="validationServer01"
            required
          />
          <div className="feedback"></div>
        </div>

        <div className="col-md-6">
          <label htmlFor="validationServer02" className="form-form-label d-flex justify-content-center">
            Last name
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer02"
            required
          />
          <div className="feedback"></div>
        </div>

       

        <div className="col-md-6">
          <label htmlFor="validationServerMail" className="form-form-label d-flex justify-content-center">
            Mail
          </label>
          <div className="input-group has-validation">
            <input
              type="text"
              className="form-control is-invalid"
              id="validationServerMail"
              aria-describedby="inputGroupPrepend3 validationServerUsernameFeedback"
              required
            />
            <span className="input-group-text" id="inputGroupPrepend3">
              @gmail.com
            </span>
            <div
              id="validationServerUsernameFeedback"
              className="feedback"
            >
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="validationServer01" className="form-form-label d-flex justify-content-center">
            {" "}
            Password{" "}
          </label>
          <input
            type="text"
            className="form-control is-valid"
            id="validationServer01"
            required
          />
          <div className="valid-feedback">Looks good!</div>
        </div>

        <div className="col-12">
          <div className="form-check">
            <input
              className="form-check-input is-invalid"
              type="checkbox"
              value=""
              id="invalidCheck3"
              aria-describedby="invalidCheck3Feedback"
              required
            />
            <label className="form-check-label" htmlFor="invalidCheck3">
              Agree to terms and conditions
            </label>
            <div id="invalidCheck3Feedback" className="invalid-feedback">
              You must agree before submitting.
            </div>
          </div>
        </div>

        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Submit form
          </button>
        </div>
      </form>
    </div>
  );
}
export default rForm;
