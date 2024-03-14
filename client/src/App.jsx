import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />
        {/* <Route path="*" element={<Navigate to="/app" />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
export default App;
