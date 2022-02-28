import './App.css';
import { InputTodo, EditTodo, ListTodo } from './components/index'

function App() {
  return (
    <>
     <div className="inputContainer">
      <InputTodo />
      <ListTodo />
     </div>
    </>
  );
}

export default App;
