import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Grid, ButtonGroup, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  header: {
    margin: theme.spacing(3),
  },
  navbar: {
    margin: theme.spacing(3),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  navitem: {
    margin: theme.spacing(1),
  },
}));

const Header = ({ title }) => {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const classes = useStyles();
  const history = useHistory();
  
  const onLogout = (e) => {
    e.preventDefault();
    if (confirm("로그아웃하시겠습니까?")) {
      localStorage.removeItem("user");
      setUser("");
      axios
        .get("api/auth/logout")
        .then((res) => {
          alert("로그아웃 되었습니다.");
          history.push("/");
        })
        .catch((error) => {
          console.log(error);
          alert("서버 에러");
        });
    }
  };

  return (
    <Grid container className={classes.navbar}>
      <Typography variant="h2" align="center" className={classes.header}>
        {title}
      </Typography>
      <ButtonGroup>
        <Button component={NavLink} to="/">
          HOME
        </Button>
        <Button component={NavLink} to="/about">
          ABOUT
        </Button>
        <Button component={NavLink} to="/gallery">
          GALLERY
        </Button>
        <Button component={NavLink} to="/board">
          BOARD
        </Button>
        {user && (
          <Button component={NavLink} to="/msg">
            MESSAGE
          </Button>
        )}
        {user ? (
          <Button onClick={onLogout}>LOGOUT</Button>
        ) : (
          <Button component={NavLink} to="/join">
            JOIN
          </Button>
        )}
        {!user && (
          <Button component={NavLink} to="/login">
            LOGIN
          </Button>
        )}
      </ButtonGroup>
    </Grid>
  );
};

export default Header;
