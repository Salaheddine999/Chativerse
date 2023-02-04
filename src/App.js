import './App.css';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatMessage from './components/ChatMessage';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/chat' element={<ChatMessage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
