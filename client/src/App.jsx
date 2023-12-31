import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import GlobalStyles from './styles/GlobalStyle';

const AppLayout = lazy(() => import('./components/AppLayout'));
const Home = lazy(() => import('./pages/Home'));
const Product = lazy(() => import('./pages/Product'));
const Address = lazy(() => import('./pages/Address'));
const Cart = lazy(() => import('./pages/Cart'));
const Login = lazy(() => import('./pages/Login'));
const Orders = lazy(() => import('./pages/Orders'));
const Profile = lazy(() => import('./pages/Profile'));
const Wishlist = lazy(() => import('./pages/Wishlist'));
import Spinner from './ui/Spinner';
import { DarkModeContextProvider } from './context/DarkModeContext';
import { AuthenticationContextProvider } from './context/AuthenticationContext';

function App() {
  return (
    <AuthenticationContextProvider>
      <DarkModeContextProvider>
        <GlobalStyles />
        <Suspense fallback={<Spinner />}>
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/user" element={<Profile />} />
                <Route path="/address" element={<Address />} />
                <Route path="/wishlist" element={<Wishlist />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/cart" element={<Cart />} />
              </Route>
              <Route path="/login" element={<Login />} />
              <Route path="/*" element={<h1>Invalid route</h1>} />
            </Routes>
          </BrowserRouter>
        </Suspense>
      </DarkModeContextProvider>
    </AuthenticationContextProvider>
  );
}

export default App;
