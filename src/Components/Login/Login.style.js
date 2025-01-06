
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    button: {
        marginTop: '10px',
    },
    link: {
        marginTop: '10px',
        textAlign: 'center',
        textDecoration: 'none',
        color: theme.palette.primary.main,
    },
    forgotPassword: {
        marginTop: '5px',
        textAlign: 'center',
    },
    errorText: {
        color: 'red',
        fontSize: '12px',
    },
}));