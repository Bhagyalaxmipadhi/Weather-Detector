import { BrowserRouter } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import Weather from "./Components/Weather/Weather";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/weather" element={<Weather />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
