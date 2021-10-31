import React from "react";
import FirebaseContext from "./Firebase/FirebaseContext";
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'
import Dashboard from "./Pages/Dashboard";
import Login from './Pages/Login'
import SignUp from "./Pages/Signup";
import PrivateRoute from "./Firebase/PrivateRoute";
import DataContext from "./Context/DataContext";
function App() {
  return (
    <React.Fragment>
    <FirebaseContext>
    <DataContext>
      <Router>
        <Switch>
          <PrivateRoute exact path='/' component={Dashboard}/>
          <Route path='/login' component={Login}/>
          <Route path='/signup' component={SignUp}/>
        </Switch>
      </Router>
      </DataContext>
   </FirebaseContext>
   </React.Fragment>
  );
}

export default App;
