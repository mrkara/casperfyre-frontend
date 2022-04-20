import Routes from 'routes';
import LoadingProvider from 'shared/components/modules/Loading';
import { DialogProvider } from 'shared/components/partials/Dialog/Provider';

function App() {
  return (
    <main className='app h-screen'>
      <LoadingProvider>
        <DialogProvider>
          <Routes />
        </DialogProvider>
      </LoadingProvider>
    </main>
  );
}

export default App;
