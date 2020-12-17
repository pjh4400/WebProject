import React from "react";
import { Grid, Typography } from "@material-ui/core";
import Header from "../components/Header";

const Home = () => {

  return (
    <>
      <Header title="HOME" />
      <Grid container direction="row" justify="center" alignItems="center">
        <Typography variant="h4" align="center">
          환영합니다 !
        </Typography>
      </Grid>
    </>
  );
};

export default Home;
