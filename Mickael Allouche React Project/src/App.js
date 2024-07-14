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
import { LoadingProvider } from './Context/Loading';

function App() {
  

  return (
    <div className='app' >
      <LoadingProvider>
        <TokenProvider>
          <ThemeModeProvider >
            <SearchProvider >
              <TheUserProvider>
                <FavCardUserProvider>
                  <NavBar />
                  <Router />
                  <Footer />
                  <ToastContainer />
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
