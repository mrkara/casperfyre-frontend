import Header from "shared/components/layouts/Header";
import Routes from 'routes';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <main className='app'>
      <Header />
      <div className="container mx-auto px-4 py-40">
        <Routes />
      </div>
      <ToastContainer theme="colored"/>
    </main>
  );
}

export default App;
