import { BrowserRouter, Route, Routes } from "react-router-dom"
import DashBoard from "./pages/DashBoard"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import About from "./pages/About"
import Home from "./pages/Home"
import Projects from "./pages/Projects"

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/dashboard" element={<DashBoard/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/projects" element={<Projects/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
