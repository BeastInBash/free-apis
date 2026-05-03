import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Authentication } from './pages/Authentication'
import { Youtube } from './pages/Youtube'
import { RandomUser } from './pages/RandomUser'
import { RandomCats } from './pages/RandomCats'
import { QuotesListing } from './pages/QuotesListing'
import { ProductListing } from './pages/ProductListing'
import { JokesViewer } from './pages/JokesViewer'
import Navbar from './components/Navbar'
import { Toaster } from 'react-hot-toast'
import LoginForm from './components/Authenticate/SignIn/Form'
import ProtectedRoute from './components/ProtectedRoute'
import { CurrentUser } from './components/Authenticate/Me/CurrentUser'
import MealsGrid from './pages/MealsListing'
import MealDetail from './pages/MealDetail'

function App() {
    return (
        <BrowserRouter>

            <Navbar />
            <Routes>
                <Route path="/" element={<Authentication />} />
                <Route path="/authentication/login" element={<LoginForm />} />
                <Route
                    path="/me"
                    element={
                        <ProtectedRoute>
                            <CurrentUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/jokes"
                    element={
                        <ProtectedRoute>
                            <JokesViewer />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/meals"
                    element={
                        <ProtectedRoute>
                            <MealsGrid />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/meals/:id'
                    element={
                        <ProtectedRoute>
                            <MealDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/products"
                    element={
                        <ProtectedRoute>
                            <ProductListing />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/quotes"
                    element={
                        <ProtectedRoute>
                            <QuotesListing />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/cats"
                    element={
                        <ProtectedRoute>
                            <RandomCats />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/user"
                    element={
                        <ProtectedRoute>
                            <RandomUser />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/youtube"
                    element={
                        <ProtectedRoute>
                            <Youtube />
                        </ProtectedRoute>
                    }
                />
            </Routes>
            <Toaster position='top-right' />
        </BrowserRouter>
    )
}

export default App
