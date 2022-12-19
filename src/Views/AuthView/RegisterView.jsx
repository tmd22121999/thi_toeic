// import "../../plugins/fontawesome-free/css/all.min.css";
import "../../plugin/icheck-bootstrap.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../dist/css/adminlte.min.css";
import useToken from "../../Helper/useToken";
import { API_BASE_URL } from "../../Constraint/api";
import { NavLink, Redirect } from "react-router-dom";
import axios from "axios";
import "./styles.css";

function LoginView() {
  const { token, setToken } = useToken();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const checkPass = (rePass) => {
    if (rePass != password) {
      setErrMsg("Mật khẩu không giống nhau");
      return;
    }
    setErrMsg("");
  };

  const RegisterHandle = async (e) => {
    e.preventDefault();
    console.log("errMsg");
    // const USER_REGEX = /^\[A-z\][A-z0-9-_]{3,23}$/;
    // const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    // const v1 = USER_REGEX.test(username);
    // const v2 = PWD_REGEX.test(password);
    // if (!v1 || !v2) {
    //   setErrMsg("Invalid Entry");
    //   return;
    // }

    try {
      console.log(
        JSON.stringify({ name: fullName, username, password, email })
      );
      const response = await axios.post(
        API_BASE_URL + "api/auth/signup",
        JSON.stringify({ name: fullName, username, password, email }),
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      setSuccess(true);
      //   //clear state and controlled inputs
      //   setUser("");
      //   setPwd("");
      //   setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration Failed");
      }
      //   errRef.current.focus();
    }
  };
  return (
    <div style={{ margin: "auto", marginTop: 100 }} class="register-box">
      {success && <Redirect to="/Login" state={{ from: location }} />}
      <div class="register-logo">
        <b>Đăng ký tài khoản</b>
      </div>
      <div class="card">
        <div class="card-body register-card-body">
          <p class="login-box-msg">
            Nhập thông tin tạo tài khoản người dùng mới
          </p>

          <form>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                placeholder="Full name"
                onChange={(e) => setFullName(e.target.value)}
              ></input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
              ></input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="email"
                class="form-control"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              ></input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              ></input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input
                type="password"
                class="form-control"
                onChange={(e) => checkPass(e.target.value)}
                placeholder="Retype password"
              ></input>
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            {errMsg ?? <p class={"error-text"}>*{errMsg}*</p>}
            <div class="row">
              <div class="col-8">
                {/* <div class="icheck-primary">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="terms"
                    value="agree"
                  ></input>
                  <label for="agreeTerms">
                    I agree to the <a href="#">terms</a>
                  </label>
                </div> */}
              </div>
              <div class="col-4">
                <button
                  onClick={RegisterHandle}
                  class="btn btn-primary btn-block"
                >
                  Register
                </button>
              </div>
            </div>
          </form>

          {/* <div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i>
              Sign up using Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i>
              Sign up using Google+
            </a>
          </div> */}
          <NavLink className={"button-text"} exact to={"/Login"}>
            <p class="mb-0">
              <a class="text-center">I already have a membership</a>
            </p>
          </NavLink>
          {/* <a href="login.html" class="text-center">
            I already have a account
          </a> */}
        </div>
      </div>
    </div>
  );
}

export default LoginView;
