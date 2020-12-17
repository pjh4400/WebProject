import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Grid,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  ButtonGroup,
  InputAdornment,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { makeStyles } from "@material-ui/core/styles";
import Header from "../components/Header";

const useStyles = makeStyles((theme) => ({
  tableContainer: {
    padding: theme.spacing(3),
  },
  table: {
    minWidth: 650,
  },
}));

const Gallery = () => {
  const [gallery, setGallery] = useState([]);

  const classes = useStyles();

  const getPosts = () => {
    axios
      .get("api/gallery", {})
      .then((res) => {
        let tmp = [];
        res.data.map((post) => {
          tmp.push({
            postID: post._id,
            author: post.author.id,
            content: post.content,
            img: post.img,
            createAt: post.createAt,
          });
        });
        setGallery(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  const onDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete("api/gallery/" + id, {})
        .then((res) => {
          console.log(res);
          if (res.data.success) {
            alert(res.data.message);
            getPosts();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const onSearchByHashtag = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.hashtag.value);
    axios
      .get("api/gallery/search/" + e.currentTarget.hashtag.value, {})
      .then((res) => {
        let tmp = [];
        res.data.post.map((post) => {
          tmp.push({
            postID: post._id,
            author: post.author.id,
            content: post.content,
            img: post.img,
            createAt: post.createAt,
          });
        });
        setGallery(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Header title="GALLERY" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={8} align="center">
          <form onSubmit={onSearchByHashtag}>
            <TextField
              name="hashtag"
              required
              label="해시태그로 검색하기"
              autoFocus
              InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <Button type="submit">
                      <SearchIcon />
                    </Button>
                  </InputAdornment>
                ),
              }}
            />
          </form>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item xs={12} sm={8} align="center">
            <Button component={NavLink} to="/postGallery">
              사진 올리기
            </Button>
          </Grid>
        </Grid>
        {gallery &&
          gallery.map((post) => (
            <Grid item xs={12} sm={7} key={post._id} align="center">
              <Card elevation={2} style={{margin: "5"}}>
                <CardContent>
                  <Typography variant="h6">{post.createAt.split("T")[0]}</Typography>
                  <Typography variant="h6">작성자 : {post.author}</Typography>
                  <img src={"api/" + post.img} width="480" height="320" />
                  <Typography variant="h6">{post.content}</Typography>
                  {localStorage.getItem("user") == post.author && (
                    <ButtonGroup style={{margin: "5"}}>
                      <Button
                        onClick={() =>
                          history.push("/postGallery/" + post.postID)
                        }
                      >
                        수정
                      </Button>
                      <Button onClick={() => onDelete(post.postID)}>
                        삭제
                      </Button>
                    </ButtonGroup>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Gallery;
