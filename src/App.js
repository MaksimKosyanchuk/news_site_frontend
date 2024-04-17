import { useEffect, useState } from 'react';
import Header from './components/Header/index.jsx';
import StartScreen from './components/StartScreen/index.jsx';
import HomePage from './pages/HomePage/index.jsx';
import Article from './pages/Article';
import { Profile } from "./pages/Profile";
import PageNotFound from './pages/PageNotFound/index.jsx';
import Footer from "./components/Footer/index.jsx";
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';

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
    '--text-color': isDarkTheme ? 'white' : 'black',
    '--link-text-color': isDarkTheme? '#c583ff' : '#80f',
    '--footer-background': isDarkTheme ? 'rgba(0,0,0, .8)' : 'rgba(255, 255, 255, .8)',
    '--post-card-background': isDarkTheme ? '#3b3b3b' : 'white',
    '--post-card-description-color': isDarkTheme ? '#bbbbbb' : "#6b6b6b",
    '--article-date-color': isDarkTheme ? 'white' : "black",
    '--banner-haze': isDarkTheme ? 0 : 1,
    '--svg-logo-color': isDarkTheme ? 'white' : '#2f2f2f',
    '--line-color': isDarkTheme ? '#4f4f4f' : "#6b6b6b",
    '--small-text-color': isDarkTheme ? '#bbbbbb' : 'black',
    '--input-background-color': isDarkTheme ? 'rgb(51, 51, 51)' : 'white'
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

            <Route path="/auth/login" Component={Login}/>
            <Route path="/auth/register" Component={Register}/>
            <Route path="/404" Component={PageNotFound}/>
            <Route path="/posts/" Component={HomePage}/>
            <Route path="/users/:id" Component={Profile}/>
            <Route path="/posts/:id" Component={Article}/>
          </Routes>
          
        </StartScreen>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App;
