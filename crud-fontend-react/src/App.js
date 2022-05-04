import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useRef,
  useState,
} from "react";
import Footer from "./components/footer";
import Header from "./components/header";
import Main from "./components/main";

const HOST_API = "http://localhost:8080/api";

const initialState = {
  list: [],
  item: {},
};

const Store = createContext(initialState);

const Form = () => {
  const formRef = useRef(null);
  const {
    dispatch,
    state: { item },
  } = useContext(Store);
  const [state, setState] = useState({ item });

  const onAdd = (event) => {
    const request = {
      name: state.name,
      id: null,
      isCOmpleted: false,
    };
    fetch(HOST_API + "/todo", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "add-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };
  const onEdit = (event) => {
    const request = {
      name: state.name,
      id: item.id,
      isCOmpleted: item.isCOmpleted,
    };

    fetch(HOST_API + "/todo", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((todo) => {
        dispatch({ type: "update-item", item: todo });
        setState({ name: "" });
        formRef.current.reset();
      });
  };

  return (
    <form className="center" ref={formRef}>
      <input
        className=" form-control form-control-lg"
        type="text"
        name="name"
        placeholder="Ingresa dato a registrar"
        defaultValue={item.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value });
        }}
      ></input>
      {item.id && (
        <button className="btn btn-warning btn-lg m-4" onClick={onEdit}>
          Actualizar
        </button>
      )}
      {!item.id && (
        <button className="btn btn-success btn-lg m-4" onClick={onAdd}>
          Agregar
        </button>
      )}
    </form>
  );
};

const List = () => {
  const { dispatch, state } = useContext(Store);

  useEffect(() => {
    fetch(HOST_API + "/todos")
      .then((response) => response.json())
      .then((list) => {
        dispatch({ type: "update-list", list });
      });
  }, []);

  const onDelete = (id) => {
    console.log(id);
    fetch(HOST_API + "/" + id + "/todo", {
      method: "DELETE",
    }).then((list) => {
      dispatch({ type: "delete-item", id });
    });
  };

  const onEdit = (todo) => {
    dispatch({ type: "edit-item", item: todo });
  };
  return (
    <table className="table p-5">
      <thead>
        <tr className="table-success">
          <td>
            <b>ID</b>
          </td>
          <td>
            <b>Nombre</b>
          </td>
          <td>
            <b>¿Esta completado?</b>
          </td>
        </tr>
      </thead>
      <tbody>
        {state.list.length > 0 ? (
          state.list.map((todo) => (
            <tr key={todo.id}>
              <td>
                <b>{todo.id}</b>
              </td>
              <td>
                <b>{todo.name}</b>
              </td>
              <td>
                <b>{todo.isCompleted === true ? "SI" : "NO"}</b>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    onDelete(todo.id);
                  }}
                >
                  Eliminar
                </button>
              </td>
              <td>
                <button
                  className="btn btn-info"
                  onClick={() => {
                    onEdit(todo);
                  }}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={3}>no hay todos</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
function reducer(state, action) {
  switch (action.type) {
    case "update-item":
      const listUpdateEdit = state.list.map((item) => {
        if (item.id === action.item.id) {
          return action.item;
        }
        return item;
      });
      return { ...state, list: listUpdateEdit, item: {} };
    case "delete-item":
      const listUpdate = state.list.filter((item) => item.id !== action.id);
      return { ...state, list: listUpdate };

    case "update-list":
      return { ...state, list: action.list };
    case "edit-item":
      return { ...state, item: action.item };
    case "add-item":
      const newList = state.list;
      newList.push(action.item);
      return { ...state, list: newList };
    default:
      return state;
  }
}

const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

function App() {
  return (
    <StoreProvider>
      <Header />
      <Main />
      <Form />
      <List />
      <Footer />
    </StoreProvider>
  );
}

export default App;
