import { useState } from "react";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [errors, setErrors] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
   
    if (!username) {
      setErrors("Username is required");
      return;
    }
    
    if (!email) {
      setErrors("Email is required");
      return;
    }
    
    if (!password) {
      setErrors("Password is required");
      return;
    }
    
    setErrors("");
    
    // Mock API simulation
    fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      })
      .then((response) => response.json())
      .then(() => {
        alert("User registered successfully");
        setUsername("");
        setEmail("");
        setPassword("");
      });
  };
  
  return (
    <div>
      <h2>Register (Controlled Components)</h2>

      {errors && <p style={{ color: "red" }}>{errors}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Username</label><br />
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div>
          <label>Email</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
