import React  from 'react';

import { Container } from "@material-ui/core";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Route,Switch, BrowserRouter, Redirect   } from 'react-router-dom';



// components
import PostDetails from './components/PostDetails/PostDetails';
import Navbar from './components/Navbar/Navbar';
import Home from "./components/Home/Home";
import Auth from './components/Auth/Auth';
// styles

function App() {
  
  return (
    
    <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
      
    <BrowserRouter>
      <Container maxwidth="xl">
      <Navbar />
        <Switch>
          <Route path="/" exact component={()=> <Redirect to="/post"/>}/>
          <Route path="/post" exact component={Home}/>
          <Route path="/post/search" exact component={Home} />
          <Route path="/post/:id" exact component={PostDetails}/>
          <Route path="/auth" exact component={Auth}/>
        </Switch>
      
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
