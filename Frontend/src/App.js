import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Postform from "./components/Postform";
import Fullpost from "./components/Fullpost";
import Register from "./components/Register";
import Login from './components/Login'
import Profile from './pages/Profile'; // Import the Profile component
import { AuthContext } from "./Helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    status: false,
  });

  useEffect(() => {
    const token = localStorage.getItem("Token");
    if (token) {
      axios
        .get("http://localhost:3001/auth/auth", {
          headers: {
            Token: token,
          },
        })
        .then((response) => {
          if (response.data.error) {
            setAuthState({ ...authState, status: false });
          } else {
            setAuthState({
              username: response.data.username,
              id: response.data.id,
              status: true,
            });
          }
        })
        .catch((error) => {
          console.error("Error checking authentication:", error);
          setAuthState({ ...authState, status: false });
        });
    } else {
      setAuthState({ ...authState, status: false });
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("Token");
    setAuthState({ username: "", id: 0, status: false });
  };

  const handleSignup = (username) => {
    setAuthState({ username, status: true });
  };

  return (
    <div>
      <div>
        <AuthContext.Provider value={{ authState, setAuthState }}>
          <Router>
            <nav className="bg-yellow-500 text-white flex justify-between items-center px-4 py-2">
              <div>
                {authState.status && <Link to="/" className="text-lg font-bold">{authState.username}'s Blog</Link>}
              </div>
              <div>
                <ul className="flex items-center space-x-4">
                  {authState.status && (
                    <>
                      <li>
                        <NavLink to="/createpost" activeClassName="text-yellow-400" className="hover:text-yellow-400">Create A Post</NavLink>
                      </li>
                      <li>
                        <NavLink to="/profile" activeClassName="text-yellow-400" className="hover:text-yellow-400">Profile</NavLink>
                      </li>
                      <li>
                        <button onClick={logout} className="hover:text-yellow-400">Logout</button>
                      </li>
                    </>
                  )}
                  {!authState.status && (
                    <>
                      <li>
                        <NavLink to="/register" activeClassName="text-yellow-400" className="hover:text-yellow-400">Register</NavLink>
                      </li>
                      <li>
                        <NavLink to="/login" activeClassName="text-yellow-400" className="hover:text-yellow-400">Login</NavLink>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            </nav>
            <Routes>
              <Route path="/" exact element={<Home />} />
              <Route path="/createpost" exact element={<Postform />} />
              <Route path="/profile" exact element={<Profile />} />
              <Route path="/post/:id" exact element={<Fullpost />} />
              <Route path="/register" exact element={<Register handleSignup={handleSignup} />} />
              <Route path="/login" exact element={<Login />} />
            </Routes>
          </Router>
        </AuthContext.Provider>
      </div>
    </div>
  );
}

export default App;
