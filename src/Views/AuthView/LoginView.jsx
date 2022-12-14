// import "../../plugins/fontawesome-free/css/all.min.css";
import "../../plugin/icheck-bootstrap.min.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../dist/css/adminlte.min.css";
import useToken from "../../Helper/useToken";
import { API_BASE_URL } from "../../Constraint/api";

function LoginView() {
  const { token, setToken } = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const loginHandle = async (e) => {
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

    setToken({ token: "aa" });
    try {
      const response = await axios.post(
        API_BASE_URL + "api/auth/signin",
        JSON.stringify({ username, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response);
      //   setSuccess(true);
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
    <div style={{ margin: "auto" }} class="login-box">
      <div class="login-logo">
        {/* <a href="../../index2.html"> */}
        <b>Đăng nhập để bắt đầu thi thử Toeic</b>
        {/* </a> */}
      </div>
      <div class="card">
        <div class="card-body login-card-body">
          {/* <p class="login-box-msg">Đăng nhập để bắt đầu thi thử Toeic</p>
          <p class="login-box-msg">{token}</p>
          <p class="login-box-msg">{errMsg}</p> */}

          <form //{action="../../index3.html"}
          // method="post"
          >
            <div class="input-group mb-3">
              <input
                // type="email"
                class="form-control"
                onChange={(e) => setUsername(e.target.value)}
                placeholder="UserName"
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
            <div class="row">
              <div class="col-8">
                <div class="icheck-primary">
                  <input type="checkbox" id="remember"></input>
                  <label for="remember">Remember Me</label>
                </div>
              </div>
              <div class="col-4">
                <button
                  onClick={loginHandle}
                  //   type="submit"
                  class="btn btn-primary btn-block"
                >
                  Sign In
                </button>
              </div>
            </div>
          </form>

          {/* <div class="social-auth-links text-center mb-3">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i> Sign in using Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i> Sign in using Google+
            </a>
          </div>

          <p class="mb-1">
            <a href="forgot-password.html">I forgot my password</a>
          </p> */}
          <p class="mb-0">
            <a href="register.html" class="text-center">
              Register a new membership
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginView;
