import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProtectedLayout />} />
        {/* <Route path="*" element={<Navigate to="/app" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
