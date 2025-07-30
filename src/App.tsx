import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './components/layouts'
import TasksPage from './pages/tasks/TasksPage'
import PrivateRoute from './components/ui/Auth/PrivateRoute'
import LoginPage from './pages/Auth/LoginPage'
import Home from './pages/Home'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/tasks"
              element={
                <PrivateRoute>
                  <TasksPage />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
