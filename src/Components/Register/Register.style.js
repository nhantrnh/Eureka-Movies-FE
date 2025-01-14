import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    maxWidth: 600,
    margin: "0 auto",
    padding: 24,
    boxShadow: 3,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#fafafa",
    borderRadius: 4,
    "& .MuiOutlinedInput-root": {
      borderColor: "#ccc",
    },
    "&:hover .MuiOutlinedInput-root": {
      borderColor: "#1976d2",
    },
  },
  button: {
    backgroundColor: "#1976d2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#1565c0",
    },
  },
  link: {
    textAlign: "center",
    textDecoration: "none",
  },
  progress: {
    color: "#fff",
  },
});

export default useStyles;
