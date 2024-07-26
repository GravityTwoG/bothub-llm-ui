import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Router } from './components/Router';

import './styles/app.scss';

function App() {
  return (
    <div>
      <Header />
      <Router />
      <Footer />
    </div>
  );
}

export default App;
