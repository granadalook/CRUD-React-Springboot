import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
} from "react";

import "./App.css";

const HOST_API = "http://localhost:8080/api";
const initialState = {
  list: [],
};
const Form = () => {
  const formRef = useRef(null);

  const onAdd = (event) => {
    event.preventDefault();
    const request = {
      name: state.name,
      description: state.description,
      id: null,
      isComplete
    };
    

  };
  return (
    <form ref={formRef}>
      <input
        type="text"
        name="name"
        onChange={(event) => {
          setState({ ...state, name: event.target.value });
        }}
      ></input>
      <input
        type="text"
        name="description"
        onChange={(event) => {
          setState({ ...state, description: event.target.value });
        }}
      ></input>
      <button onClick={onAdd}>agregar</button>
    </form>
  );
};

const Store = createContext(initialState);

const List = () => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list });
      });
  }, [state.list.length, dispatch]);

  return;
  <div>
    <table>
      <thead>
        <tr>
          <td>ID</td>
          <td>NOMBRE</td>
          <td>DESCRIPCION</td>
          <td>¿ESTA COMPLETADO?</td>
        </tr>
      </thead>
      <tbody>
        {state.list.map((todo) => {
          return (
            <tr key={todo.id}>
              <td>{todo.id}</td>
              <td>{todo.name}</td>
              <td>{todo.description}</td>
              <td>{todo.idComplete}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>;
};
function reducer(state, action) {
  switch (action.type) {
    case "undate-list":
      return { ...state, list: action.list };
    case "add-item":
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList };
    default:
      return state;
  }
}
const StoreProvider = ({ childen }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <Store.Provider value={{ state, dispatch }}>{childen}</Store.Provider>;
};

function App() {
  return (
    <StoreProvider>
      <List />
    </StoreProvider>
  );
}

export default App;
