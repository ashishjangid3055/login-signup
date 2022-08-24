import './App.css';
import Login from './components/Login';
import SignUp from './components/Sign-up';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Post from './Post';
import Get from './Get';
import Delete from './Delete';
import Api from './Api';





function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="/" element={<SignUp />} />
          <Route path="get" element={<Get />} />
          <Route path="post" element={<Post />} />
          <Route path="delete" element={<Delete />} />
          <Route path="api" element={<Api />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
