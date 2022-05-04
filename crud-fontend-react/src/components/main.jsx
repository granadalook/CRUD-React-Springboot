import React, { Fragment } from "react";
const Main = () => {
  return (
    <Fragment>
      <h1 className="text-center fw-bold fs-1 m-5">BIENVENIDOS</h1>
      <ul className="ms-5 fs-2 ">
        <li>
          <p>
            Esta aplicacion esta conformada en la parte del{" "}
            <a
              href="https://www.mmaglobal.com/news/todo-lo-que-necesitas-saber-sobre-backend-all-you-need-know-regarding-backend#:~:text=El%20Backend%2C%20tambi%C3%A9n%20conocido%20como,y%20devolverla%20al%20usuario%20final."
              target="_blank"
            >
              <b>BACKEND</b>
            </a>{" "}
            en java con ayuda de la herramienta de{" "}
            <a
              href="https://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/"
              target="_blank"
            >
              <b>SPRIGBOOT</b>
            </a>{" "}
          </p>
        </li>
        <li>
          Y tambien esta conformada en el lado del{" "}
          <a
            href="https://es.wikipedia.org/wiki/Desarrollo_web_Front-end"
            target="_blank"
          >
            {" "}
            <b>FRONTEND</b>
          </a>{" "}
          y con la ayuda de una libreria llamada{" "}
          <a
            href="https://es.reactjs.org/docs/getting-started.html"
            target="_blank"
          >
            <b>REACT</b>
          </a>
        </li>
      </ul>

      <h2
        className=" ms-5 text-center
      "
      >
        {" "}
        Esta aplicacion esta realizada para fines educativos de uso e
        implementacion de un{" "}
        <a href="https://www.ionos.es/digitalguide/paginas-web/desarrollo-web/crud-las-principales-operaciones-de-bases-de-datos/">
          <b>CRUD</b>
        </a>
      </h2>
    </Fragment>
  );
};

export default Main;
