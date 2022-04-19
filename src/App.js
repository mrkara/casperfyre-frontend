import Routes from 'routes';
import LoadingProvider from 'shared/components/modules/Loading';
import { DialogProvider } from 'shared/components/partials/Dialog/Provider';

function App() {
  return (
    <main className='app h-screen'>
      <DialogProvider>
        <LoadingProvider>
          <Routes />
        </LoadingProvider>
      </DialogProvider>
    </main>
  );
}

export default App;
