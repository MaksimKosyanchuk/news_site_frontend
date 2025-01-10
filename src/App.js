import { useEffect, useState, createContext } from 'react';
import Header from './components/Header/index.jsx';
import StartScreen from './components/StartScreen/index.jsx';
import HomePage from './pages/HomePage/index.jsx';
import Article from './pages/Article';
import Profile from "./pages/Profile";
import PageNotFound from './pages/PageNotFound/index.jsx';
import Footer from "./components/Footer/index.jsx";
import Login from './pages/Login/index.jsx';
import Register from './pages/Register/index.jsx';
import CreatePost from './pages/CreatePost/index.jsx';
import Toast from "./components/Toast/index.jsx";

import "./styles/common.scss";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const AppContext = createContext()

function App() {
  let lsTheme = localStorage.getItem('theme');
  const [ profile, setProfile ] = useState(null)
  const [ profileLoading, setProfileLoading ] = useState(false)
  let [ isDarkTheme, setIsDarkTheme ] = useState(lsTheme ? JSON.parse(lsTheme) : true);
  let [ toast, showToast ] = useState(false);



  const CssVariables = {
    '--main-background': isDarkTheme ? 'rgb(37, 37, 37)' : 'rgb(215 215 215)',
    '--loader-color': isDarkTheme ? 'white' : 'black',
    '--warning-color': isDarkTheme ? 'rgb(255 191 0)' : 'rgb(255, 179, 0)',
    '--warning-background-color': isDarkTheme ? 'rgb(94, 85, 42, .8)' : 'rgba(255, 245, 163, .8)',
    '--success-color': isDarkTheme ? 'rgb(132 255 148)' : 'rgb(0 139 12)',
    '--success-background-color': isDarkTheme ? 'rgb(72, 90, 73, .8)' : 'rgba(199, 252, 188, .8)',
    '--error-color': isDarkTheme ? 'rgb(246, 0, 0)' : 'rgb(255 14 14)',
    '--error-background-color': isDarkTheme ? 'rgba(92, 62, 62, .8)' : 'rgba(250, 223, 223, .8)',
    '--svg-logo-color': isDarkTheme ? 'white' : '#2f2f2f',
    '--line-color': isDarkTheme ? '#4f4f4f' : "#afafaf",
    '--text-color': isDarkTheme ? 'white' : 'black',
    '--link-text-color': isDarkTheme? '#c583ff' : '#80f',
    '--small-text-color': isDarkTheme ? '#bbbbbb' : '#212121',
    '--background-text-color': isDarkTheme ? 'rgb(55, 55, 55)' : 'rgb(197, 197, 197)',
    '--input-background-color': isDarkTheme ? 'rgb(51, 51, 51)' : '#c9c9c9',
    '--input-outline-color': isDarkTheme ? 'rgb(70,70,70)' : '#8d8d8d',
    '--active-drop-file-border': isDarkTheme ? '#ababab' : '#555555',
    '--submit-button-secondary-color': isDarkTheme ? 'rgba(37, 37, 37, .8)' : 'rgba(215, 215, 215, .8)',
    '--submit-button-primary-color': isDarkTheme ? 'rgb(215, 215, 215)' : 'rgb(55,55,55)',
    '--header-background': isDarkTheme ? 'rgba(0,0,0, .8)' : 'rgba(255,255,255, .8)',
    '--header-button-color': isDarkTheme ? '#c6c6c6' : '#797979',
    '--header-button-hover-color': isDarkTheme ? 'white' : 'black',
    '--banner-haze': isDarkTheme ? 0 : 1,
    '--post-title-color': isDarkTheme ? '#e7e7e7' : "black",
    '--post-card-background': isDarkTheme ? '#3b3b3b' : 'white',
    '--post-card-description-color': isDarkTheme ? '#bbbbbb' : "#6b6b6b",
    '--more-message-on-post': isDarkTheme ? '#858585' : 'black',
    '--article-date-color': isDarkTheme ? '#858585' : "#797979",
    '--article-topic-button-color': isDarkTheme ? '#858585' : '#797979',
    '--article-topic-button-hover-color': isDarkTheme ? '#dddddd' : '#1e1e1e',
    '--footer-background': isDarkTheme ? '#333333' : 'white',
    '--footer-content-color': isDarkTheme ? "#797979" : "#b3b3b3",
    '--footer-content-hover-color': isDarkTheme ? '#dddddd' : '#434343',
  }


  useEffect(() => {
    localStorage.setItem('theme', JSON.stringify(isDarkTheme))
  }, [isDarkTheme])

  return (
    <AppContext.Provider value={{profile, setProfile, isDarkTheme, setIsDarkTheme, profileLoading, setProfileLoading, toast, showToast }}>
      <Router>
        <div className={`App ${isDarkTheme ? 'App_dark' : ''}`} style={CssVariables}>

          <StartScreen>
            <Header/>
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
              <Route path="/create-post" Component={CreatePost}/>
              <Route path="/users/:id" Component={Profile}/>
              <Route path="/posts/:id" Component={Article}/>
            </Routes>
            
          </StartScreen>
          <Footer></Footer>
          <Toast toast={toast} showToast={showToast}/>
        </div>
      </Router>
    </AppContext.Provider>
  )
}

export { App, AppContext };
