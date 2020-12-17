import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    background: theme.palette.success.main,
  },
  content: {
    padding: theme.spacing(3),
    width: "80%",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    marginTop: theme.spacing(3),
  },
}));

export default useStyles;
