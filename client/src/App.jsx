import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedLayout from "./components/ProtectedLayout";
import Dashboard from "./pages/Dashboard";
import useTheme from "./hooks/useTheme";
import Plans from "./pages/Plans";
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
              <ProtectedLayout toggleTheme={toggleTheme}>
                <Dashboard />
              </ProtectedLayout>
            }
          />
          <Route path="/plans" element={<Plans />} />
          {/* <Route path="*" element={<Navigate to="/app" />} /> */}
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
};
export default App;
