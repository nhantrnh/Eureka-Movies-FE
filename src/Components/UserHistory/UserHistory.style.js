import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
      marginTop: theme.spacing(4),
      padding: theme.spacing(2),
      minHeight: '100vh',
  },
  title: {
      marginBottom: theme.spacing(4),
      fontWeight: 'bold',
      textAlign: 'center',
  },
  gridContainer: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
      flexWrap: 'wrap',
  },
  card: {
      maxWidth: 345,
      borderRadius: '8px',
      boxShadow: theme.shadows[3],
      transition: 'transform 0.3s ease',
      '&:hover': {
          transform: 'scale(1.05)',
      },
  },
  cardMedia: {
      height: 300,
      borderRadius: '8px 8px 0 0',
  },
  cardContent: {
      padding: theme.spacing(2),
  },
  actorName: {
      fontWeight: 'bold',
      fontSize: '1.1rem',
      color: theme.palette.primary.main,
      display: 'flex',
      justifyContent: 'center',
  },
  actorKnownFor: {
      fontStyle: 'italic',
      color: theme.palette.text.secondary,
  },
  viewButtonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: theme.spacing(2),
  },
  viewButton: {
      backgroundColor: theme.palette.primary.main,
      color: '#fff',
      '&:hover': {
          backgroundColor: theme.palette.primary.dark,
      },
  },
  pagination: {
      marginTop: theme.spacing(3),
      display: 'flex',
      justifyContent: 'center',
  },
  noResults: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '60vh',
      color: theme.palette.text.primary,
      textAlign: 'center',
  },
}));

export default useStyles;