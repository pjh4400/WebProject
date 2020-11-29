import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const Login = ({ history }) => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onLogin = (e) => {
    e.preventDefault();
    axios
      .post("api/auth/login", {
        id: form.id,
        password: form.password,
      })
      .then((res) => {
        if (res.data.success) {
          // API 요청 할때마다 헤더에 Token 담아 전송
          axios.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${res.data.token}`;
          localStorage.setItem("user", JSON.stringify(form.id));
          history.push("/");
        } else {
          console.log(res);
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <>
      <h1>로그인</h1>
      <form onSubmit={onLogin}>
        <TextField
          name="id"
          onChange={onChangeForm}
          required
          fullWidth
          label="아이디"
          autoFocus
        />
        <TextField
          name="password"
          type="password"
          onChange={onChangeForm}
          required
          fullWidth
          label="비밀번호"
        />
        <Button type="submit">로그인</Button>
      </form>
    </>
  );
};

export default Login;
