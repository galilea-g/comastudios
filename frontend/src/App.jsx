import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from "./pages/HomePage";
import ContenidoFormPage from './pages/contenidoFormPage';
import ThemeFormPage from './pages/themeFormPage';
import ThemePage from './pages/ThemesPage';
import ProfilePage from './pages/ProfilePage';
import Navbar from './components/NavBar';
import CategoryPage from './pages/CategoryPage';
import CategoryFormPage from './pages/categoryFormPage';

import ProtectedRoute from './protectedRoutes';
import { ThemeProvider } from './context/ThemeContext';
import { CategoryProvider } from './context/CategoryContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider> 
        <CategoryProvider>
          <BrowserRouter>
          <main className="container content-container mx-auto px-10 md:px-0">
              <Navbar/>
              <Routes>
                <Route path='/' element={<HomePage/>} />
                <Route path='/login' element={<LoginPage/>} />
                <Route path='/register' element={<RegisterPage/>} />
                <Route element={<ProtectedRoute/>}>
                  <Route path='/contenido/new' element={<ContenidoFormPage/>} />
                  <Route path='/categories' element={<CategoryPage/>} />
                  <Route path='/category/new' element={<CategoryFormPage/>} />
                  <Route path='/category/edit/:id' element={<CategoryFormPage/>} />
                  <Route path='/themes' element={<ThemePage/>} />
                  <Route path='/theme/new' element={<ThemeFormPage/>} />
                  <Route path='/theme/edit/:id' element={<ThemeFormPage/>} />
                  <Route path='/contenido/edit/:id' element={<ContenidoFormPage/>} />
                  <Route path='/profile' element={<ProfilePage/>} />
                </Route>
              </Routes>
          </main>
          </BrowserRouter>
        </CategoryProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App