import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    textAlign: 'center',
  },
  circularProgress:{
    display: 'flex',
    alignItems:'center',
    justifyContent: 'center',
    height: '70vh',
    
  }
}));