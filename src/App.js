import Home from './Pages/Home/Home'
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="App">
      <Home/>
      <Toaster/>
    </div>
  );
}

export default App;
