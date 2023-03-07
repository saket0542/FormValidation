import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const initialValues = { username: "", email: "", password: "" }; // defining initial state.
  const [formValues, setFormValues] = useState(initialValues); // using state  hook to set the states of our variables.
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name)
    // the e.target gives the input tag which contains the name and value attribute.
    setFormValues({ ...formValues,[name]: value });
    // above line is awesome->
    // This shows how important can be name attribute in input tag.
    console.log(formValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Helps us to prevent the page from refresh.
    setFormErrors(validate(formValues));
    // Interesting line of code->
    // validate function will perform its work and if error is found
    // it got returned and now setFormErrors methods will used the 
    // returned error to update the formErrors state Variable.
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
   //This Object will refer to the formErrors.
   // Line no 32 basically doing a check that if we dont have any error and our
   // form is submitted then console log our valid form values.
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    // regex stands for regular expression.
    if (!values.username) {
      // Checking if username is empty?
      errors.username = "Username is required!";
    }
    if (!values.email) {
      //checking if email is empty?
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      // checking if the email id entered matches the format specified or not.
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      // Checking if password is entered or not? 
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    return errors;
  };

  return (
    <div className="container">
      {Object.keys(formErrors).length === 0 && isSubmit ? (
        <div className="ui message success">Signed in successfully</div>
      ) : (
        <pre>{JSON.stringify(formValues, undefined, 2)}</pre>
      )}
  {
    // Line no 67-71 is preety interesting , it is just 
    // a if else statement.
  }
      <form onSubmit={handleSubmit}>
        <h1>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}// binding the form values.
              onChange={handleChange}
//Whenever we type on input field its state is changing and to address
//that change we use onChange method.
            />
          </div>
          <p>{formErrors.email}</p>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.password}</p>
          <button className="fluid ui button blue">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default App; 