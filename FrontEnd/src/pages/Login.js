import React, { useState } from "react";
import axios from "axios";
import { Grid, TextField, Button } from "@material-ui/core";
import Header from "../components/Header";

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
          localStorage.setItem("user", form.id);
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
      <Header title="LOGIN" />
      <Grid container direction="row" justify="center" alignItems="center">
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
      </Grid>
    </>
  );
};

export default Login;
