import { Switch, Route, useHistory, Redirect } from 'react-router-dom';
import './App.css';
import Appbar from './components/appbar/Appbar';
import Home from './components/home/Home';
import SignIn from './components/login/SignIn';
import SignOut from './components/logout/SignOut';
import Navbar from './components/nav/Navbar';
import SignUp from './components/register/SignUp';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import Profile from './components/profile/Profile';
import Discover from './components/discover/Discover';
function App() {
  const { isAuthenticate } = useSelector(state => state.userData)

  return (
    <>
      <Navbar />
      {/* asdfashdf
     <Appbar/> */}
      <Switch>
        {
          isAuthenticate ? (
            <>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/discover'>
                <Discover />
              </Route>
              <Route path='/profile/:id'>
                <Profile />
              </Route>
              <Route exact path='/signout'>
                <SignOut />
              </Route>
            </>
          ) : (
            <>
              <Route exact path='/signin'>
                <SignIn />
              </Route>
              <Route exact path='/signup'>
                <SignUp />
              </Route>
            </>
          )
        }



      </Switch>
    </>
  );
}

export default App;
