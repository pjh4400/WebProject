import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header title="ABOUT" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} sm={7}>
          <Typography variant="h4" align="center" paragraph>
            소프트웨어학부 20180291 박재희
          </Typography>
        </Grid>
        <Grid item xs={12} sm={7}>
          <Typography variant="h6" align="center" paragraph>
            사용자 등록 O / 로그인 O / 로그아웃 O
          </Typography>
          <Typography variant="h6" align="center" paragraph>
            ABOUT (/about)
          </Typography>
          <Typography variant="h6" align="center">
            BOARD (/board)
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            본문/사용자ID/해시태그 기반 검색 O / '작성하기' 버튼 클릭
            시 작성 가능 / 내용에 '#'포함하여 해시태그 작성 시 해시태그에도
            등록됩니다. / 본인 게시물일 경우에만 수정,삭제 버튼이 보입니다.
          </Typography>
          <Typography variant="h6" align="center">
            GALLERY (/gallery)
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            해시태그 기반 검색 O / '작성하기' 버튼 클릭
            시 작성 가능 / 내용에 '#'포함하여 해시태그 작성 시 해시태그에도
            등록됩니다. / 본인 게시물일 경우에만 수정,삭제 버튼이 보입니다.
          </Typography>
          <Typography variant="h6" align="center">
            MESSAGE (/msg)
          </Typography>
          <Typography variant="body1" align="center" paragraph>
            수신자 ID 존재할 경우 메세지 전송 가능 / 메세지 함에는 자신에게 도착한 메세지만 보입니다.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
