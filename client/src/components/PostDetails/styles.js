import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    maxWidth: '70%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
      maxWidth: '100%',
    },
  },
  recommendedPosts: {
    
    display: 'flex',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      maxWidth: '100%',
    },
  },
  loadingPaper: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '20px', borderRadius: '15px', height: '39vh',
  },
  recommendedCard:{
    margin:'10px', 
    cursor:'pointer',
    padding:"10px",
    minWidth:"fit-content",
    maxWidth: "300px",
    [theme.breakpoints.down('xs')]: {
      
      maxWidth: '100%',
    },
  },
  containerImage:{
    
    marginTop:"10px",
    width:"200px",
    height:"120px",
    marginLeft:"auto",
    marginRight:"auto",
   
  },
  imageCard:{
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
    boxShadow: "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
  }
}));