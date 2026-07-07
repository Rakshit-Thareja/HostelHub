import { Route, Routes } from "react-router"
import Navbar from "./Components/Student/Navbar"
import StudentDashboard from "./Pages/StudentDashboard"
import StudentComplaints from "./Pages/StudentComplaints"
import StudentNotices from "./Pages/StudentNotices"
import StudentLeaveApplication from "./Pages/StudentLeaveApplication"
import StudentMessMenu from "./Pages/StudentMessMenu"
import StudentLostFound from "./Pages/StudentLostFound"
import StudentProfile from "./Pages/StudentProfile"

const App = () => {
  return (
    <div className="w-screen flex">

      <Navbar/>

      <div className="flex-1">
    
        <Routes>

            <Route path="/" element={<StudentDashboard/>}/>

            <Route path='/Complaints' element={<StudentComplaints/>}/>

            <Route path='/Notices' element={<StudentNotices/>}/>

            <Route path='/LeaveApplication' element={<StudentLeaveApplication/>}/>

            <Route path='/MessMenu' element={<StudentMessMenu/>}/>

            <Route path='/LostFound' element={<StudentLostFound/>}/>

            <Route path="/Profile" element={<StudentProfile/>}/>

        </Routes>

      </div>
      


    </div>
  )
}

export default App
