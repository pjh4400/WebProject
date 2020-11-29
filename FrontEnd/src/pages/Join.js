import React, { useState } from "react";
import axios from "axios";
import { TextField, Button } from "@material-ui/core";

const Join = ({history}) => {
  const [form, setForm] = useState({
    id: "",
    password: "",
    password2: "",
  });

  const onChangeForm = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onJoin = (e) => {
    e.preventDefault();
    if (form.password === form.password2) {
      axios
        .post("api/auth/join", {
          id: form.id,
          password: form.password,
        })
        .then((res) => {
          if(res.data.success){
            alert(res.data.message);
            history.push("/");
          } else {
            alert(res.data.message);
          }
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert('회원가입에 실패했습니다.');
        });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <>
      <h1>회원가입 페이지</h1>
      <form onSubmit={onJoin}>
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
        <TextField
          name="password2"
          type="password"
          onChange={onChangeForm}
          required
          fullWidth
          label="비밀번호 확인"
        />
        <Button type="submit"> 회원가입 </Button>
      </form>
    </>
  );
};

export default Join;
