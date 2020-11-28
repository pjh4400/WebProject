import React from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Button } from "@material-ui/core";


const Navigation = () => {
  const onLogout = (e) => {
    e.preventDefault();
    if (confirm("로그아웃하시겠습니까?")) {
      axios
        .get("api/auth/logout")
        .then((res) => {
        console.log(res);
          alert(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          alert("서버 에러");
        });
    }
  };

  return (
    <div>
      <Button component={NavLink} to="/">
        홈
      </Button>
      <Button component={NavLink} to="/join">
        회원가입
      </Button>
      <Button component={NavLink} to="/login">
        로그인
      </Button>
      <Button onClick={onLogout}>로그아웃</Button>
    </div>
  );
};

export default Navigation;
