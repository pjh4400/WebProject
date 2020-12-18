import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, TextField, Button } from "@material-ui/core";
import Header from "../components/Header";
import useStyles from "../Style";
import { useParams } from "react-router-dom";

const PostGallery = ({ history }) => {
  const [img, setImg] = useState(null);
  const [content, setContent] = useState("");
  const { postID } = useParams();

  const classes = useStyles();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("로그인이 필요합니다.");
      history.push("/login");
    }
  }, []);

  const onChangeImg = (e) => {
    const formData = new FormData();
    formData.append("img", e.target.files[0]);
    axios
      .post("api/gallery/img", formData)
      .then((res) => {
        console.log(res.data);
        setImg(res.data);
      })
      .catch((error) => {
        console.log(error);
        alert("서버 에러");
      });
  };

  const onChangeContent = (e) => {
    setContent(e.target.value);
  };

  const onPost = (e) => {
    e.preventDefault();
    axios
      .post("api/gallery/", {
        img: img,
        content: content,
      })
      .then((res) => {
        history.push("/gallery");
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
        alert("서버 에러");
      });
  };
  

  return (
    <>
      <Header title="GALLERY" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8} align="center">
          <input type="file" accept="image/*" onChange={onChangeImg} />
        </Grid>
        <Grid item xs={12} sm={5} align="center">
          <TextField
            type="text"
            name="content"
            onChange={onChangeContent}
            required
            variant="outlined"
            fullWidth
            label="내용 및 해시태그"
            autoFocus
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

export default PostGallery;
