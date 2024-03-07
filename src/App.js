import { useEffect, useState } from 'react';
import Header from './components/Header/Header.js';
import StartScreen from './components/StartScreen/StartScreen.js';
import Posts from './pages/Posts';
import Article from './pages/Article';
import Profile from "./pages/Profile";
import PageNotFound from './pages/PageNotFound/index.jsx';

import Footer from "./components/Footer/Footer.js";
import "./styles/common.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

function App() {
  let lsTheme = localStorage.getItem('theme');

  let [ isDarkTheme, setIsDarkTheme ] = useState(lsTheme ? JSON.parse(lsTheme) : true);

  const CssVariables = {
    '--loader-color': isDarkTheme ? 'white' : 'black',
    '--main-background': isDarkTheme ? 'rgb(37, 37, 37)' : 'rgb(215 215 215)',
    '--header-background': isDarkTheme ? 'rgba(0,0,0, .8)' : 'rgba(255,255,255, .8)',
    '--header-menu-background': isDarkTheme ? 'rgba(0,0,0,1)' : 'rgba(255,255,255, 1)',
    '--text-color': isDarkTheme ? 'white' : 'black',
    '--link-text-color': isDarkTheme? '#c583ff' : '#80f',
    '--footer-background': isDarkTheme ? 'rgba(0,0,0, .8)' : 'rgba(255, 255, 255, .8)',
    '--post-card-background': isDarkTheme ? '#3b3b3b' : 'white',
    '--post-card-description-color': isDarkTheme ? '#bbbbbb' : "#6b6b6b",
    '--article-date-color': isDarkTheme ? 'white' : "black",
    '--banner-haze': isDarkTheme ? 0 : 1,
    '--svg-logo-color': isDarkTheme ? 'white' : '#2f2f2f'
  }

  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  return (
    <Router>
      <div className={`App ${isDarkTheme ? 'App_dark' : ''}`} style={CssVariables}>

        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme}/>

        <StartScreen>

          <Routes>
            
            <Route
              path="*"
              element={<Navigate to="/404" replace />} />
            
            <Route
              path="/"
              element={<Navigate to="/posts" replace />} />
            
            <Route path="/404" Component={PageNotFound}/>
            <Route path="/posts/" Component={Posts}/>
            <Route path="/posts/:id" Component={Article}/>
            <Route path="/users/:id" Component={Profile}/>
          </Routes>
          
        </StartScreen>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App;
