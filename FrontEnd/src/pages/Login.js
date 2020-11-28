import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const Login = ({ history }) => {
  const [form, setForm] = useState({
    id: "",
    password: "",
  });

  const onChangeForm = (e) => {
    e.preventDefault();
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
        alert(res.data.message);
        switch (res.data.status) {
          case 200:
            history.push("/");
            break;
          case 403:
            break;
        }
        console.log(res);
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
