import { lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const ProtectedLayout = lazy(() => import("./components/ProtectedLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Loading = lazy(() => import("./pages/Plans/Loading"));
const Success = lazy(() => import("./pages/Plans/Success"));

import useTheme from "./hooks/useTheme";
import { theme, ConfigProvider } from "antd";
import { UsersProvider } from "./context/UsersContext";

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
      <UsersProvider>
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
      </UsersProvider>
    </ConfigProvider>
  );
};
export default App;
