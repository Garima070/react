import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Alert from './Components/Alert';
import Login from './Components/Login';
import Signup  from './Components/Signup';
import { useState } from 'react';

import{
  BrowserRouter as Router,Switch,Route
} from "react-router-dom"
import NoteState from './Context/notes/NoteState';


function App() {
  const [alert, setalert]=useState(null)
  const showalert=(message,type)=>{
    setalert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setalert(null)
    }, 2000);
  }
  return (
    <>
    <NoteState>
    <Router>
    <Navbar/>
    <Alert alert={alert}/>
    <div className="container">
    <Switch>
      <Route exact path="/">
         <Home showalert={showalert}/>
         </Route>
         <Route exact path="/about">
          <About/>
          </Route>
         <Route exact path="/login">
          <Login showalert={showalert}/>
          </Route>
         <Route exact path="/signup">
          <Signup showalert={showalert}/>
          </Route>
         </Switch>
         </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
 