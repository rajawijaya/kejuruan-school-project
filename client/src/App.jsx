import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./views/HomePage/HomePage";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={ <HomePage/> }>
            
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App;