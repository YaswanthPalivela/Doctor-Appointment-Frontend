import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import LandingPage from "./pages/LandingPage"
import DoctorProfile from "./pages/DoctorProfile"
import BookAppointment from "./pages/BookAppointment"




const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/doctor/:id" element={<DoctorProfile/>}/>
        <Route path="/book/:id" element={<BookAppointment/>}/>
      </Routes>
    </Router>
  )
}

export default App