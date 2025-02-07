// src/utils/loginUtils.js

// Function to check token validity
export const checkTokenValidity = async (navigate) => {
  try {
    const response = await fetch(
      `${process.env.REACT_APP_BACKEND_URL}/protected`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      navigate("/home");
    } else {
      navigate("/");
    }
  } catch (error) {
    navigate("/");
  }
};

// Function to handle input field changes
export const handleChange = (e, data, setData) => {
  const { name, value } = e.target;
  setData({ ...data, [name]: value });
};

// Function to handle form submission for login
export const handleClick = async (e, data, setMessage, navigate) => {
  e.preventDefault();
  if (!data.username || !data.password) {
    if (!data.username) {
      setMessage("Username is required!");
    } else if (!data.password) {
      setMessage("Password is required!");
    } else {
      setMessage("Username and Password are required!");
    }
    return;
  }
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (response.ok) {
      const loginResponse = await response.json();
      setMessage(loginResponse.message);
      localStorage.setItem("token", loginResponse.data.token);
      localStorage.setItem("username", loginResponse.data.username);
      navigate("/home");
    } else {
      setMessage("Login failed. Please try again.");
    }
  } catch (error) {
    setMessage("An error occurred. Please try again.");
  }
};
