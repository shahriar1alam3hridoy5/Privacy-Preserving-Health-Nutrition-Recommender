// import Signup from "./components/Auth/Signup";

// function App() {
//   return <Signup />;
// }

// export default App;


// import Login from "./components/Auth/Login";

// function App() {
//   return <Login />;
// }

// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Navbar from "./components/Layout/Navbar";
import WelcomeSection from "./components/Home/WelcomeSection";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        {/* Default page Login */}
        <Route path="/signup" element={<Signup />} /> {/* Signup page */}
        <Route path="/home" element={
          <>
            <Navbar />
            <WelcomeSection />
          </>
        } />   {/* Home page with Navbar */}
      </Routes>
    </Router>
  );
}

export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Signup from "./components/Auth/Signup";
// import Login from "./components/Auth/Login";
// import Navbar from "./components/Layout/Navbar";   // Navbar import

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />        {/* Default page Login */}
//         <Route path="/signup" element={<Signup />} /> {/* Signup page */}
//         <Route path="/home" element={<Navbar />} />   {/* Home page with Navbar */}
//       </Routes>
//     </Router>
//   );
// }

// export default App;
