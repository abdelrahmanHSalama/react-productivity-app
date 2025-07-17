import "./App.css";
import { ConfigProvider } from "antd";
import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./layouts/MainLayout";
import TasksPage from "./pages/TasksPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: React.FC = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider
        theme={{
          token: {},
          components: {
            Menu: {
              algorithm: true, // Enable algorithm
            },
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainLayout />}>
              {/* <Route index element={<Home />} /> */}
              <Route path="tasks" element={<TasksPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
