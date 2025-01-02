import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./pages/SignIn";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignIn></SignIn>}></Route>
          <Route path="/" element={}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
