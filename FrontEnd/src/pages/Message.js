import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
} from "@material-ui/core";
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

const Message = ({ history }) => {
  const [messages, setMessages] = useState([]);
  const [form, setForm] = useState({
    receiver: "",
    content: "",
  });

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const getMessages = () => {
    axios
      .get("api/msg", {})
      .then((res) => {
        let tmp = [];
        res.data.map((msg) => {
          tmp.push({
            sender: msg.sender,
            content: msg.content,
            createAt: msg.createAt,
          });
        });
        setMessages(tmp);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* 등록 */
  const onPost = () => {
    axios
      .post("api/msg", {
        receiver: form.receiver,
        content: form.content,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          getMessages();
        }
      })
      .catch((error) => {
        console.log(error);
        alert("서버 에러");
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      alert("로그인이 필요합니다.");
      history.push("/login");
    } else {
      getMessages();
    }
  }, []);

  return (
    <>
      <Header title="MESSAGE" />
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
            name="receiver"
            onChange={onChangeForm}
            required
            variant="outlined"
            label="수신자ID"
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
            rows={8}
          />
        </Grid>
        <Grid item xs={12} sm={8} align="center">
          <Button onClick={onPost}>메세지보내기</Button>
        </Grid>
        <Grid item xs={12} sm={7} align="center">
          <Typography variant="h4" paragraph> * 메세지함 * </Typography>
        </Grid>
        {messages.map((msg) => (
          <Grid item key={msg._id} xs={12} sm={7} align="center">
            <Card>
              <CardContent elevation={2} style={{ margin: "5" }}>
                <Typography variant="body1">
                  보낸 날짜: {msg.createAt.split("T")[0]}
                </Typography>
                <Typography variant="body1">보낸이: {msg.sender.id}</Typography>
                <Typography variant="h6"> {msg.content}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Message;
