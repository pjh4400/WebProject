import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
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

const Board = () => {
  const [board, setBoard] = useState([]);
  const [modify, setModify] = useState({
    postID: "",
    title: "",
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
      .get("api/board", {})
      .then((res) => {
        let tmp = [];
        res.data.map((post) => {
          tmp.push({
            postID: post._id,
            author: post.author.id,
            content: post.content,
            title: post.title,
            createAt: post.createAt,
          });
        });
        setBoard(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getPosts();
  }, []);

  /* 내용으로 검색하기 */
  const onSearchByContent = (e) => {
    e.preventDefault();
    axios
      .get("api/board/searchContent/" + e.currentTarget.content.value, {})
      .then((res) => {
        if (res.data.success) {
          let tmp = [];
          res.data.post.map((post) => {
            tmp.push({
              postID: post._id,
              author: post.author.id,
              content: post.content,
              title: post.title,
              createAt: post.createAt,
            });
          });
          setBoard(tmp);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchByID = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.id.value);
    axios
      .get("api/board/searchID/" + e.currentTarget.id.value, {})
      .then((res) => {
        if (res.data.success) {
          let tmp = [];
          res.data.post.map((post) => {
            tmp.push({
              postID: post._id,
              author: post.author.id,
              content: post.content,
              title: post.title,
              createAt: post.createAt,
            });
          });
          setBoard(tmp);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSearchByHashtag = (e) => {
    e.preventDefault();
    axios
      .get("api/board/searchHashtag/" + e.currentTarget.hashtag.value, {})
      .then((res) => {
        let tmp = [];
        if (res.data.success) {
          res.data.post.map((post) => {
            tmp.push({
              postID: post._id,
              author: post.author.id,
              content: post.content,
              title: post.title,
              createAt: post.createAt,
            });
          });
          setBoard(tmp);
        } else {
          alert(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* 삭제 */
  const onDelete = (id) => {
    if (confirm("정말 삭제하시겠습니까?")) {
      axios
        .delete("api/board/" + id, {})
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

  /* 수정 */
  const onPut = () => {
    axios
      .put("/api/board", {
        title: modify.title,
        content: modify.content,
        postID: modify.postID,
      })
      .then((res) => {
        setModify({
          postID: "",
          title: "",
          content: "",
        })
        getPosts();
      })
      .catch((error) => {
        console.log(error.config);
      });
  };

  return (
    <>
      <Header title="BOARD" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={7} align="center">
          <form onSubmit={onSearchByContent}>
            <TextField
              name="content"
              required
              label="본문으로 검색하기"
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
        <Grid item xs={12} sm={7} align="center">
          <form onSubmit={onSearchByID}>
            <TextField
              name="id"
              required
              label="사용자 ID로 검색하기"
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
        <Grid item xs={12} sm={7} align="center">
          <form onSubmit={onSearchByHashtag}>
            <TextField
              name="hashtag"
              required
              label="해시태그로 검색하기"
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
        <Grid item xs={12} sm={8} align="center">
          {
            <ButtonGroup>
              <Button component={NavLink} to="/postBoard">
                작성하기
              </Button>
              <Button onClick={getPosts}>전체 보기</Button>
            </ButtonGroup>
          }
        </Grid>
        {board.map((post) => (
          <Grid item key={post.postID} xs={12} sm={7} align="center">
            <Card>
              {post.postID === modify.postID ? (
                <CardContent elevation={2} style={{ margin: "5" }}>
                  <Grid item xs={12} sm={7} align="center">
                    <TextField
                      type="text"
                      name="title"
                      onChange={onChangeModify}
                      value={modify.title}
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
                      onChange={onChangeModify}
                      value={modify.content}
                      required
                      variant="outlined"
                      label="내용"
                      fullWidth
                      multiline
                      rows={10}
                    />
                  </Grid>
                  {localStorage.getItem("user") == post.author && (
                    <Button onClick={onPut}>수정하기</Button>
                  )}
                </CardContent>
              ) : (
                <CardContent elevation={2} style={{ margin: "5" }}>
                  <Typography variant="body1">
                    {post.createAt.split("T")[0]}
                  </Typography>
                  <Typography variant="body1">
                    작성자 : {post.author}
                  </Typography>
                  <Typography variant="h6">제목 : {post.title}</Typography>
                  <Typography variant="h6"> {post.content}</Typography>
                  {localStorage.getItem("user") == post.author && (
                    <ButtonGroup style={{ margin: "5" }}>
                      <Button
                        onClick={() =>
                          setModify({
                            postID: post.postID,
                            title: post.title,
                            content: post.content,
                          })
                        }
                      >
                        수정하기
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

export default Board;
