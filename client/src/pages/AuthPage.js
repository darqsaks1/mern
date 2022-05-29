import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMesage } from "../hooks/message.hook";
import { AuthContext } from "../context/authContext";
export const AuthPage = () => {
  const auth = useContext(AuthContext);
  const message = useMesage();
  const { loading, error, request, clearError } = useHttp();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  useEffect(() => {
    message(error);
    clearError();
  }, [error, message, clearError]);

  const changeHandler = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    try {
      const data = await request("/api/auth/register", "POST", { ...form });
      console.log(data.message);
    } catch (error) {}
  };

  const loginHandler = async () => {
    try {
      const data = await request("/api/auth/login", "POST", { ...form });
      auth.login(data.token, data.userId);
    } catch (error) {}
  };

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <div className="card  darken-1">
          <div className="card-content white-text">
            <span className="card-title black-text">Authrization</span>
          </div>
          <div class="input-field s6  ">
            <input
              placeholder="Pass Email"
              id="email"
              type="text"
              name="email"
              class="validate"
              onChange={changeHandler}
            />
          </div>
          <div class="input-field  s6">
            <input
              placeholder="Pass Password"
              id="password"
              type="password"
              name="password"
              class="validate"
              onChange={changeHandler}
            />
          </div>
          <div class="card-action">
            <button
              className="btn yellow darken-4"
              style={{ marginRight: 10 }}
              disabled={loading}
              onClick={loginHandler}
            >
              Login
            </button>{" "}
            <button
              className="btn grey lighten-1 black-text"
              onClick={registerHandler}
              disabled={loading}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
