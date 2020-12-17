import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Button } from "@material-ui/core";
import Header from "../components/Header";
import { useParams } from "react-router-dom";

const PostBoard = ({ history }) => {
  const { postID } = useParams();
  const [form, setForm] = useState({
    title: "",
    content: "",
  });


  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("로그인이 필요합니다.");
      history.push("/login");
    }
  }, []);

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* 등록 */
  const onPost = () => {
    axios
      .post("api/board", {
        title: form.title,
        content: form.content,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          history.push("/board");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("서버 에러");
      });
  };

  /* 수정 */
  const onPut = () => {
    console.log(postID);
    axios
      .put("http://localhost:3000/board", {
        title: form.title,
        content: form.content,
        postID: postID,
      })
      .then((res) => {
        console.log(res);
        history.push("/board");
      })
      .catch((error) => {
        console.log(error.config);
      });
  };

  return (
    <>
      <Header title="BOARD" />
      <Grid
        container
        spacing={2}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Grid item xs={12} sm={7} align="center">
          <TextField
            type="text"
            name="title"
            onChange={onChangeForm}
            required
            variant="outlined"
            label="제목"
            fullWidth
            autoFocus
          />
        </Grid>
        <Grid item xs={12} sm={7} align="center">
          <TextField
            type="text"
            name="content"
            onChange={onChangeForm}
            required
            variant="outlined"
            label="내용"
            fullWidth
            multiline
            rows={10}
          />
        </Grid>
        <Grid item xs={12} sm={8} align="center">
          {postID ? (
            <Button onClick={onPut} size="large">수정</Button>
          ) : (
            <Button onClick={onPost} size="large">등록</Button>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default PostBoard;
