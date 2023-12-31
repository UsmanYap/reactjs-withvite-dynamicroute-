import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Prodi from "./pages/Prodi";
import Mahasiswa from "./pages/Mahasiswa";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/prodi" element={<Prodi />} />
        <Route path="/mahasiswa/:npm" element={<Mahasiswa />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
