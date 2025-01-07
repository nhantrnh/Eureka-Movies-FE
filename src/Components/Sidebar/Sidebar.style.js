
import { makeStyles } from "@mui/styles";

export default makeStyles((theme)=>({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
    },
    image: {
        width: '40%',
    },
    links: {
        color: theme.palette.text.primary,
        textDecoration: 'none',
    },
    genereImages: {
        filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'dark',
    },
}));