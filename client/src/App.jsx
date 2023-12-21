import { Navbar,Welcome,Exchange,Footer,Services,Transactions,Market } from "./components"
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

const App= ()=> {
  return (
    <div className="min-h-screen">
     <Router>
     <div className="gradient-bg-welcome">
        <Navbar/>
        <Routes>
      <Route path="/" element={<><Welcome/><Services/><Transactions/></>}></Route>
      <Route path="/exchange" element={<Exchange/>}></Route>
      <Route path="/market" element={<Market/>}></Route>
      </Routes>
      </div>
     
      <Footer/>
     </Router>
    </div>
    )
}

export default App
