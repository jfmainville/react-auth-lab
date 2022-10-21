import "./App.scss";
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { firebaseConfig } from "./configs/firebase";
import { useDispatch } from "react-redux";
import { validate } from "./store/authActions";
import { Route, Routes, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App () {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        initializeApp(firebaseConfig);

        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                dispatch(validate({ user: user }));
                navigate("/");
            } else {
                navigate("/login");
            }
        });
    }, []);

    return (
      <Routes>
          <Route path="/" element={<Dashboard/>}/>
          <Route path="/login" element={<Login/>}/>
      </Routes>
    );
}

export default App;
