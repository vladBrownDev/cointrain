import './App.scss';
import React from "react";
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import Welcome from './components/Welcome/Welcome';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <div id='app'>
      <Header/>
      <Router>
          <Routes>
            <Route path="/" element={<Welcome />}></Route>
            <Route path='train'>
              <Route path=":currency" element={<Main />} />
            </Route>
          </Routes>
      </Router>
    </div>
  );
}

export default App;
