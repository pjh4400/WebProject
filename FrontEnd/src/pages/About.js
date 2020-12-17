import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Header from "../components/Header";

const About = () => {
  return (
    <>
      <Header title="ABOUT" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            소프트웨어학부 20180291 박재희
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1" align="center">
            React 공부 시작 단계라 미숙하지만 실습 겸 사용해보았습니다 :)
            한학기동안 감사했습니다.
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default About;
