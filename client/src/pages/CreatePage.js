import React, { useState, useEffect, useContext } from "react";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/authContext";
import { useHistory } from "react-router-dom";

export const CreatePage = () => {
  const history = useHistory();
  const auth = useContext(AuthContext);
  const { request } = useHttp();
  const [link, setLink] = useState("");
  useEffect(() => {
    window.M.updateTextFields();
  }, []);
  const pressHandler = async (e) => {
    if (e.key === "Enter") {
      try {
        const data = await request(
          "/api/link/generate",
          "POST",
          {
            from: link,
          },
          {
            Authorization: `Bearer ${auth.token}`,
          }
        );
        history.push(`/detail/${data.link._id}`);
      } catch (error) {}
    }
  };
  return (
    <div className="row">
      <div class="col s8 offset-s2">
        {" "}
        <div class="input-field s6  ">
          <input
            placeholder="Pass link"
            id="link"
            type="text"
            value={link}
            class="validate"
            onChange={(event) => setLink(event.target.value)}
            onKeyPress={pressHandler}
          />
        </div>
      </div>
    </div>
  );
};
