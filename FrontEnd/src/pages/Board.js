import React from "react";
import { TextField, Button } from "@material-ui/core";

const Board = () => {
  const [form, setForm] = useState({
    title: "",
    content: "",
    hashtag: "",
  });

  const onChangeForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onPost = (e) => {
    e.preventDefault();
    axios
      .post("api/board", {
        author: "",
        title: form.title,
        content: form.content,
        hashtag: form.hashtag,
      })
      .then((res) => {
        alert(res.data.message);
        if (res.data.success) {
          history.push("/");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <div>
      <h1>게시판</h1>
      <form onSubmit={onPost}>
        <TextField
          name="title"
          onChange={onChangeForm}
          required
          fullWidth
          label="제목"
          autoFocus
        />
        <TextField
          name="content"
          onChange={onChangeForm}
          required
          fullWidth
          label="내용"
        />
        <TextField
          name="hashtag"
          onChange={onChangeForm}
          required
          fullWidth
          label="해시태그"
        />
        <Button type="submit">등록</Button>
      </form>
    </div>
  );
};

export default Board;
