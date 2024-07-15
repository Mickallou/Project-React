import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { ThemeModeProvider } from './Context/ThemeMode';
import Router from './Router';
import { TheUserProvider } from './Context/TheUser';
import { TokenProvider } from './Context/Token';
import { FavCardUserProvider } from './Context/FavCardUser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Footer from './Components/Footer/Footer';
import { SearchProvider } from './Context/Search';
import { LoadingProvider, useLoading } from './Context/Loading';
import Loader from './Components/Loader/Loader';

function AppContent() {
  const { loading } = useLoading();

  return (
    <div className='app'>
      <NavBar />
      {loading && <Loader />}
      <Router />
      <Footer />
      <ToastContainer />
    </div>
  );
}

function App() {

  return (
    <div className='app' >
      <LoadingProvider>
        <TokenProvider>
          <ThemeModeProvider >
            <SearchProvider >
              <TheUserProvider>
                <FavCardUserProvider>
                  <AppContent />
                </FavCardUserProvider>
              </TheUserProvider>
            </SearchProvider>
          </ThemeModeProvider>
        </TokenProvider>
      </LoadingProvider>
    </div>
  );
}

export default App;
