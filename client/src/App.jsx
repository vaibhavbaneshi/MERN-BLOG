import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashBoard from "./pages/DashBoard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Home from "./pages/Home"
import Projects from "./pages/Projects"
import Header from "./components/Header"
import Footer from "./components/Footer"

function App() {
  
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
