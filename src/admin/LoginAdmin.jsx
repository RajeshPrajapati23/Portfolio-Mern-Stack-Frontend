import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { toastCustm } from "../common/method";
import { useNavigate } from "react-router-dom";
import Loader from "../pages/Loader";

const LoginDiv = styled.div`
  padding: 20px;
  border-radius: 9px;
  box-shadow: 0px 0px 10px 3px #861ba1;
  display: flex;
  align-items: center;
  margin: 20px;
  box-sizing: border-box;
  /* background-color: #adbada;  */
  background-color: #b8b8dc;
  box-shadow: 0px 0px 10px 3px #7191e6;
`;

const SubmitBtn = styled.button`
  background-color: #3d52a1;
  width: 100%;
  color: #fff;
  padding: 10px 10px;
  border-radius: 9px;
  outline: none;
  border: none;
  margin-top: 5px;
`;
const LoginText = styled.h2`
  font-weight: 700;
  text-shadow: #000000b2 4px 1px 2px;
  border-radius: 9px;
  align-items: center;
  font-size: 30px;
  display: inline-flex;
  justify-content: center;
  padding: 10px 10px 5px 10px;
  border-bottom: 5px solid #10338a;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
`;
function Admin() {
  const [state, setstate] = useState({
    loader: false,
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const onSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    if (!email.trim() || !String(password).trim()) {
      toastCustm(false, "", "All Fields are required");
      return;
    }
    setstate({ ...state, loader: true });
    try {
      const res = await axios.post(
        import.meta.env.VITE_APIKEY + "/api/auth/admin/login",
        {
          email: state.email,
          password: state.password,
        }
      );
      localStorage.setItem("token", res.data.token);
      toastCustm(true, res.data.msg, "");
      navigate("/");

      console.log(res);
    } catch (err) {
      toastCustm(false, "", err.response.data.msg);
      console.error(err);
    } finally {
      setstate({ ...state, loader: false });
    }
  };
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setstate({ ...state, [name]: value });
  };
  const { loader } = state;
  return (
    <div
      className="d-flex justify-content-center align-items-center "
      style={{ minHeight: "100vh" }}
    >
      {loader && <Loader />}

      <LoginDiv>
        <div className="card-body pt-5 text-white">
          <LoginText className="text-uppercase text-center mb-5">
            Login
          </LoginText>
          <form>
            <div data-mdb-input-init className="form-outline mb-2">
              <label className="form-label" for="form3Example3cg">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={state.email}
                placeholder="Email"
                id="form3Example3cg"
                className="form-control p-2"
                onChange={inputHandler}
              />
            </div>

            <div data-mdb-input-init className="form-outline mb-2">
              <label className="form-label" for="form3Example4cg">
                Password
              </label>
              <input
                type="text"
                name="password"
                placeholder="Password"
                value={state.password}
                id="form3Example4cg"
                className="form-control p-2"
                onChange={inputHandler}
              />
            </div>

            <div className="d-flex justify-content-center">
              <SubmitBtn
                type="button"
                onClick={onSubmit}
                data-mdb-button-init
                data-mdb-ripple-init
              >
                Submit
              </SubmitBtn>
            </div>
          </form>
        </div>
      </LoginDiv>
    </div>
  );
}

export default Admin;
