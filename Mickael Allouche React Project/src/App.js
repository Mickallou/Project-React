import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { AdminProvider } from './Context/Admin';
import { IsBusinessProvider } from './Context/Business';
import { ContectedProvider } from './Context/Contected';
import { ThemeModeProvider } from './Context/ThemeMode';
import { FavCardProvider } from './Context/FavCard';
import Router from './Router';

function App() {
  
  return (
    <div className='app' >
      <ThemeModeProvider >
        <ContectedProvider >
          <IsBusinessProvider>
            <AdminProvider>
              <FavCardProvider>
                <NavBar />
                <Router />
              </FavCardProvider>
            </AdminProvider>
          </IsBusinessProvider>
        </ContectedProvider>
      </ThemeModeProvider>
    </div>
  );
}

export default App;
