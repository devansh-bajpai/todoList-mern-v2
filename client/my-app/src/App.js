import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Todo from './components/Todo';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes
} from "react-router-dom";


function App() {
  return (
    <>
    <Router>

    <Routes>
    <Route path='/'/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/todo' element={<Todo/>}/>
    </Routes>


    </Router>

    
    </>
  );
}

export default App;
