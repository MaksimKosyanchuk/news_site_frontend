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
    '--svg-logo-color': isDarkTheme ? 'white' : '#2f2f2f',
    '--line-color': isDarkTheme ? '#4f4f4f' : "#afafaf",
    '--text-color': isDarkTheme ? 'white' : 'black',
    '--link-text-color': isDarkTheme? '#c583ff' : '#80f',
    '--small-text-color': isDarkTheme ? '#bbbbbb' : 'black',
    '--background-text-color': isDarkTheme ? 'rgb(55, 55, 55)' : 'rgb(197, 197, 197)',
    '--input-background-color': isDarkTheme ? 'rgb(51, 51, 51)' : 'white',
    '--active-drop-file-border': isDarkTheme ? '#ababab' : '#555555',
    '--button-background-color': isDarkTheme ? 'rgba(37, 37, 37, .8)' : 'rgba(215, 215, 215, .8)',
    '--hover-button-background-color': isDarkTheme ? 'rgb(215, 215, 215)' : 'rgb(55,55,55)',
    '--header-background': isDarkTheme ? 'rgba(0,0,0, .8)' : 'rgba(255,255,255, .8)',
    '--header-button-color': isDarkTheme ? '#c6c6c6' : '#3f3f3f',
    '--header-button-hover-color': isDarkTheme ? 'white' : 'black',
    '--banner-haze': isDarkTheme ? 0 : 1,
    '--post-title-color': isDarkTheme ? '#e7e7e7' : "black",
    '--post-card-background': isDarkTheme ? '#3b3b3b' : 'white',
    '--post-card-description-color': isDarkTheme ? '#bbbbbb' : "#6b6b6b",
    '--more-message-on-post': isDarkTheme ? '#858585' : 'black',
    '--article-date-color': isDarkTheme ? '#858585' : "#797979",
    '--article-topic-button-color': isDarkTheme ? '#858585' : '#797979',
    '--article-topic-button-hover-color': isDarkTheme ? '#dddddd' : '#434343',
    '--footer-background': isDarkTheme ? '#333333' : 'white',
    '--footer-content-color': isDarkTheme ? "#858585" : "#797979",
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
