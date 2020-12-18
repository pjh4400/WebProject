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
  const [modify, setModify] = useState({
    postID: "",
    content: "",
  });

  const classes = useStyles();

  const onChangeModify = (e) => {
    setModify({
      ...modify,
      [e.target.name]: e.target.value,
    });
  };

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
    axios
      .get("api/gallery/search/" + e.currentTarget.hashtag.value, {})
      .then((res) => {
        console.log(res.data.post);
        let tmp = [];
        if (res.data.success) {
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
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

    /* 수정 */
  const onPut = () => {
    axios
      .put("api/gallery/", {
        postID: modify.postID,
        content: modify.content,
      })
      .then((res) => {
        setModify({
          postID: "",
          img: "",
          content: "",
        })
        getPosts();
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
        {gallery.map((post) => (
          <Grid item key={post.postID} xs={12} sm={7} align="center">
            <Card>
              {post.postID === modify.postID ? (
                <CardContent elevation={2} style={{ margin: "5" }}>
                  <Grid item xs={12} sm={8} align="center" style={{ padding: "5" }}>
                  <img src={"api/" + post.img} width="480" height="320" />
                  </Grid>
                  <Grid item xs={12} sm={5} align="center" style={{  padding: "5" }}>
                    <TextField
                      type="text"
                      name="content"
                      onChange={onChangeModify}
                      required
                      variant="outlined"
                      fullWidth
                      label="내용 및 해시태그"
                      value={modify.content}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8} align="center">
                    <Button onClick={onPut} size="large">
                      수정
                    </Button>
                  </Grid>
                </CardContent>
              ) : (
                <CardContent elevation={2} style={{ margin: "5" }}>
                  <Typography variant="h6">
                    {post.createAt.split("T")[0]}
                  </Typography>
                  <Typography variant="h6">작성자 : {post.author}</Typography>
                  <img src={"api/" + post.img} width="480" height="320" />
                  <Typography variant="h6">{post.content}</Typography>
                  {localStorage.getItem("user") == post.author && (
                    <ButtonGroup style={{ margin: "5" }}>
                      <Button
                        onClick={() =>
                          setModify({
                            postID: post.postID,
                            content: post.content,
                          })
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
              )}
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Gallery;
