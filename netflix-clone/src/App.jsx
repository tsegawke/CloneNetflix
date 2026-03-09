import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Four04 from "./pages/NotFound404/NotFound404";
import Player from "./pages/Player/Player";
// import { onAuthStateChanged } from "firebase/auth";
// import { useEffect } from "react";
// import { auth } from "./firebase";
import { ToastContainer } from "react-toastify";

const App = () => {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   onAuthStateChanged(auth, async (user) => {
  //     if (user) {
  //       console.log("Logged In");
  //       navigate("/");
  //     } else {
  //       console.log("Logged Out");
  //       navigate("/login");
  //     }
  //   });
  // }, []);

  return (
    <div>
      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/player/:id" element={<Player />} />
        <Route path="*" element={<Four04 />} />
      </Routes>
    </div>
  );
};

export default App;
