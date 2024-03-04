import Header from './models/Header/Header.js';
import StartScreen from './models/StartScreen/StartScreen.js';
import Posts from './pages/Posts';
import Article from './pages/Article';

import Footer from "./models/Footer/Footer.js";
import "./styles/common.css";
import 'react-quill/dist/quill.snow.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

const PageNotFound = () => <h1>404...</h1> 

function App() {

  return (
    <Router>
      <div className="App">
        <Header />

        <StartScreen>

          <Routes>
            
            <Route
              path="*"
              element={<Navigate to="/posts" replace />} />
            
            <Route path="/posts/" Component={Posts}/>
            <Route path="/posts/:id" Component={Article}/>
          </Routes>
          
        </StartScreen>
        
        <Footer />
      </div>
    </Router>
  )
}

export default App;
