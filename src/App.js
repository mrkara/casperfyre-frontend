import Routes from 'routes';
import LoadingProvider from 'shared/components/modules/Loading';

function App() {
  return (
    <main className='app h-screen'>
      <LoadingProvider>
        <Routes />
      </LoadingProvider>
    </main>
  );
}

export default App;
