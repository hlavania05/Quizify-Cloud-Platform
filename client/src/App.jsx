import { BrowserRouter, Routes , Route} from "react-router-dom";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Navbar } from "./components/Navbar";
import { Portal } from "./pages/Portal";
import { Logout } from "./pages/Logout";
import { Error } from "./pages/Error";
import { Result } from "./pages/Result";
import { QuizPage } from "./pages/QuizPage"; 
import { Footer } from "./components/Footer";
import { AdminPortal } from "./pages/Admin";
import { Manage_Quizzes } from "./pages/Manage_Quizzes"; 
import { UserResult } from "./pages/UserResult";


const App = () =>{
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/portal" element={<Portal/>}/>
          <Route path="/quiz/:quizId" element={<QuizPage />} />
          <Route path="/results" element={<Result/>}/>
          <Route path="/manage_quizzes" element={<Manage_Quizzes/>}/>
          <Route path="/manage_users" element={<AdminPortal/>}/>
          <Route path="/userResultDetails" element={<UserResult/>} />
          <Route path="/logout" element={<Logout/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
};

export default App;