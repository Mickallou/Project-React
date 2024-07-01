import './App.css';
import NavBar from './Components/NavBar/NavBar';
import { AdminProvider } from './Context/Admin';
import { IsBusinessProvider } from './Context/Business';
import { ThemeModeProvider } from './Context/ThemeMode';
import Router from './Router';
import { TheUserProvider } from './Context/TheUser';
import { TokenProvider } from './Context/Token';

function App() {
  
  return (
    <div className='app' >
      <TokenProvider>
        <ThemeModeProvider >
            <IsBusinessProvider>
              <AdminProvider>
                <TheUserProvider>
                  <NavBar />
                  <Router />
                </TheUserProvider>
              </AdminProvider>
            </IsBusinessProvider>
        </ThemeModeProvider>
      </TokenProvider>
    </div>
  );
}

export default App;
