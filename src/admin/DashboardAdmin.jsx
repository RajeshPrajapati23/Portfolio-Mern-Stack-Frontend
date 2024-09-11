import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { toastCustm } from "../common/method";
import { Modal } from "react-bootstrap";
import Loader from "../pages/Loader";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
// import socket from "../socket/socket";

const FlexDiv = styled.div`
  display: flex;
  justify-content: end;
  box-sizing: border-box;
  margin: 15px;
`;
const Btn = styled.button`
  background-color: #3d52a1;
  color: #fff;
  padding: 8px 15px;
  border-radius: 6px;
  outline: none;
  border: none;
`;
const ProjectCont = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;
const H2Style = styled.h2`
  font-weight: 700;
  display: inline;
  text-shadow: #000e3a40 4px 1px 2px;
  font-size: 30px;
  border-radius: 9px;
  padding: 10px;
  border-bottom: 4px solid #10338a;
  color: var(--bg4);
`;
const CustomAlertConitaner = styled.div`
  background-color: var(--bg1);
  color: var(--bg4);
  padding: 20px 50px 20px 20px;
  min-width: max-content;
`;
const AdminDashboard = () => {
  const [state, setState] = useState({
    title: "",
    description: "",
    file: "",
    id: "", //uniqe id of project
    show: false,
    projects: [],
    loader: true,
  });
  const { VITE_APIKEY } = import.meta.env;
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const addEdit = useRef();

  const getProject = async () => {
    try {
      const res = await axios.get(VITE_APIKEY + "/api/project/get", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in Authorization header
        },
      });

      setState({ ...state, projects: res.data.projects });
    } catch (error) {
      console.error(error);
      navigate("/loginadmin");
      toastCustm(false, "", error.response.data);
      return;
    } finally {
      setState((prev) => ({ ...prev, loader: false }));
      $(document).ready(function () {
        $("#myTable").DataTable({
          scrollX: true,
          screenY: true,
          destroy: true,
        });
      });
    }
  };
  useEffect(() => {
    if (!token) {
      navigate("/loginadmin");
    }
    getProject();
  }, []);
  const inputHadler = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const inputFileHandler = (e) => {
    const file = e.target.files[0];
    setState({ ...state, file });
  };
  const addProject = async (e) => {
    e.preventDefault();

    const { title, description, file } = state;
    if (!file || !title || !description) {
      toastCustm(false, "", "All Fields are Required");
      return;
    }
    setState((prev) => ({ ...prev, show: false, loader: true }));

    const formData = new FormData();
    formData.append("file", file); // Append the file to formData
    formData.append("title", title); // Append the file to formData
    formData.append("description", description); // Append the file to formData

    try {
      const res = await axios.post(VITE_APIKEY + "/api/project/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // Required for file upload
        },
      });
      console.log(res.data); // Handle the response from the server
      setState((prev) => ({
        ...prev,
        projects: [...state.projects, res.data.project],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, loader: false }));
    }
  };

  const onAddModal = () => {
    addEdit.current = "Add";
    setState({ ...state, show: true });
  };
  const onEditModal = (data) => {
    addEdit.current = "Edit";
    const { title, description, file } = data;
    setState({ ...state, title, description, file, id: data._id, show: true });
  };
  const onCloseModal = () => {
    setState({ ...state, title: "", description: "", file: "", show: false });
  };
  const deleteProject = async (id) => {
    setState((prev) => ({ ...prev, loader: true }));

    try {
      const res = await axios.delete(
        VITE_APIKEY + "/api/project/delete/" + id,

        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );
      const filterd = state.projects.filter((data) => data._id !== id);
      setState((prev) => ({ ...prev, projects: filterd }));
      console.log(res);
    } catch (error) {
      console.error(error);
    } finally {
      setState((prev) => ({ ...prev, loader: false }));
    }
  };
  const deletePopup = (id) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <CustomAlertConitaner>
            <h1 className="text-3xl m-2">Are you sure?</h1>
            <p className="font-medium text-lg m-2">
              You want to delete this Data?
            </p>
            <Btn onClick={onClose} className="m-2">
              No
            </Btn>
            <Btn
              onClick={() => {
                deleteProject(id);
                onClose();
              }}
            >
              Yes, Delete it!
            </Btn>
          </CustomAlertConitaner>
        );
      },
    });
  };

  const editProject = async (id) => {
    console.log("id", id);

    const { title, description, file } = state;
    if (!title || !description) {
      toastCustm(false, "", "All Fields are Required");
      return;
    }
    setState((prev) => ({ ...prev, show: false, loader: true }));

    const formData = new FormData();
    if (file) {
      formData.append("file", file); // Append the file to formData
    }
    formData.append("title", title); // Append the file to formData
    formData.append("description", description); // Append the file to formData
    formData.append("id", id); // Append the file to formData

    try {
      const res = await axios.put(
        VITE_APIKEY + "/api/project/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Required for file upload
          },
        }
      );
      console.log(res.data); // Handle the response from the server
      const filterd = state.projects.filter((data) => data._id !== id);
      setState((prev) => ({
        ...prev,
        projects: [...filterd, res.data.project],
      }));
    } catch (err) {
      console.error(err);
    } finally {
      setState((prev) => ({ ...prev, loader: false }));
    }
  };
  console.log(state);
  console.log(addEdit.current);
  const { show, title, description, file, loader } = state;
  return (
    <div>
      {loader && <Loader />}
      <FlexDiv>
        <Btn onClick={onAddModal}>Add Project</Btn>
      </FlexDiv>
      <ProjectCont>
        <H2Style className="white">Project List</H2Style>
      </ProjectCont>
      <table id="myTable" className="display">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody style={{ fontWeight: "400" }}>
          {state.projects?.map((data, i) => (
            <tr key={i}>
              <td>
                <img
                  src={data.image?.url}
                  style={{ height: "30px" }}
                  alt=""
                  loading="lazy"
                />
              </td>
              <td>{data.title}</td>
              <td>{data.description}</td>
              <td onClick={() => onEditModal(data)}>
                <span className="material-symbols-outlined cursor-pointer">
                  edit_square
                </span>
              </td>
              <td onClick={() => deletePopup(data._id)}>
                <span className="material-symbols-outlined cursor-pointer">
                  delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal show={show} onHide={onCloseModal}>
        <Modal.Header closeButton style={{ backgroundColor: "#EEE8F6" }}>
          <h1 className="text-2xl text-blue4"> {addEdit.current} Project</h1>
        </Modal.Header>
        <Modal.Body className="bg-blue1">
          <div>
            <div style={{ marginTop: "5px" }}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={title}
                placeholder="Enter Title"
                onChange={inputHadler}
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={description}
                placeholder="Enter Description"
                onChange={inputHadler}
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              <label>Upload Image</label>
              <input
                type="file"
                name="file"
                placeholder="Upload Image"
                onChange={inputFileHandler}
              />
            </div>
            <div style={{ marginTop: "5px" }}>
              <Btn
                style={{ textAlign: "center" }}
                onClick={
                  addEdit.current === "Add"
                    ? addProject
                    : () => editProject(state?.id)
                }
              >
                Submit
              </Btn>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
