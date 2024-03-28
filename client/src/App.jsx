import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import useTheme from "./hooks/useTheme";
import Loading from "./pages/Plans/Loading";
import Success from "./pages/Plans/Success";
import { theme, ConfigProvider } from "antd";

const App = () => {
  const [currentTheme, toggleTheme] = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm:
          currentTheme === "dark"
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedLayout
                toggleTheme={toggleTheme}
                currentTheme={currentTheme}
              >
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route path="/plans" element={<Loading />} />
          <Route path="/success" element={<Success />} />
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;
