import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { ThemeModeProvider } from './Context/ThemeMode';
import Router from './Router';
import { TheUserProvider } from './Context/TheUser';
import { TokenProvider } from './Context/Token';
import { FavCardUserProvider } from './Context/FavCardUser';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  
  return (
    <div className='app' >
      <TokenProvider>
        <ThemeModeProvider >
                <TheUserProvider>
                  <FavCardUserProvider>
                    <NavBar />
                    <Router />
                    <ToastContainer />
                  </FavCardUserProvider>
                </TheUserProvider>
        </ThemeModeProvider>
      </TokenProvider>
    </div>
  );
}

export default App;
