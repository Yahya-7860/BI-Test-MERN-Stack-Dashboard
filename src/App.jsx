import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from './pages/DashboardPage'
import AuthPage from './pages/LoginSignUpPage'
import ProtectedRoute from './utils/ProtectedRoute';
import GroupInside from './pages/GroupInside';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<AuthPage />} />
          <Route path="dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }>
            <Route path="group_details/:group_id" element={
              <ProtectedRoute>
                <GroupInside />
              </ProtectedRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
