import React, { useState } from "react";
import axios from "axios";
const Dashboard = () => {
  const [file, setFile] = useState(null);

  const onFileChange = (e) => {
    setFile(e.target.files[0]); // Set the file from the file input
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/auth/register", {
        name: "Rajesh Prajapati",
        email: "rajesh24723@gmail.com",
        password: "rajesh24723@admin",
      });
      //  adminName: "Rajesh Prajapati",
      //         emailId: "rp417150@gmail.com",
      //         password: "raj@417150",
      console.log(res);
      // setMessage("Registered successfully"); // Set success message
    } catch (err) {
      console.error(err);
      // setMessage("Failed to register, User already exists"); // Set error message
    }
  };
  const onUpload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a file to upload");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to formData

    try {
      const res = await axios.post(
        "http://127.0.0.1:5000/api/project/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );
      console.log(res.data); // Handle the response from the server
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <form onSubmit={onUpload}>
        <input type="file" name="file" onChange={onFileChange} required />
        <button type="submit">Upload File</button>
      </form>
      <header className="headerSec mb-3 border-bottom">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-between justify-content-lg-start">
            <a
              href="/"
              className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none"
            >
              <h4 className="fontPlaywrite">Rajesh</h4>
            </a>

            <ul className="nav  col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 tabsHome">
              <li>
                <a href="#" className="nav-link px-2 link-dark waight-bold ">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark ">
                  Projects
                </a>
              </li>
              <li>
                <a href="#" className="nav-link px-2 link-dark ">
                  About
                </a>
              </li>
            </ul>
            {/*
            <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              <input
                type="search"
                className="form-control"
                placeholder="Search..."
                // aria-label="Search"
              />
            </form> */}

            <div className="dropdown text-end">
              <a
                href="#"
                className="d-block link-dark text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://github.com/mdo.png"
                  alt="mdo"
                  width="32"
                  height="32"
                  className="rounded-circle"
                />
              </a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                width="20"
                height="20"
                x="0"
                y="0"
                viewBox="0 0 329.269 329"
                className="svgClose"
              >
                <g>
                  <path
                    d="M194.8 164.77 323.013 36.555c8.343-8.34 8.343-21.825 0-30.164-8.34-8.34-21.825-8.34-30.164 0L164.633 134.605 36.422 6.391c-8.344-8.34-21.824-8.34-30.164 0-8.344 8.34-8.344 21.824 0 30.164l128.21 128.215L6.259 292.984c-8.344 8.34-8.344 21.825 0 30.164a21.266 21.266 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25l128.21-128.214 128.216 128.214a21.273 21.273 0 0 0 15.082 6.25c5.46 0 10.922-2.09 15.082-6.25 8.343-8.34 8.343-21.824 0-30.164zm0 0"
                    fill="#000000"
                    opacity="1"
                    data-original="#000000"
                  ></path>
                </g>
              </svg>
              <ul
                className="dropdown-menu text-small"
                aria-labelledby="dropdownUser1"
                // style=""
              >
                <li>
                  <a className="dropdown-item" href="#">
                    Resume
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Linkedin
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Profile
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Dashboard;
// client/src/components/Register.js
// import React, { useState } from "react";
// import axios from "axios";

// const Dashboard = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     password: "",
//   });
//   const [message, setMessage] = useState("");

//   const { username, password } = formData;

//   const onChange = (e) =>
//     setFormData({ ...formData, [e.target.name]: e.target.value });

//   const onSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post("http://127.0.0.1:5000/register", {
//         username,
//         password,
//       });
//       setMessage("Registered successfully"); // Set success message
//       console.log(res, "res");
//     } catch (err) {
//       console.error(err.response.data);
//       setMessage("Failed to register, User already exists"); // Set error message
//     }
//   };

//   return (
//     <div className="auth-form">
//       <h2>Register</h2>
//       <form onSubmit={onSubmit}>
//         <input
//           type="text"
//           placeholder="Username"
//           name="username"
//           value={username}
//           onChange={onChange}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={password}
//           onChange={onChange}
//           required
//         />
//         <button type="submit">Register</button>
//       </form>
//       <p className="message">{message}</p>
//     </div>
//   );
// };

// export default Dashboard;
