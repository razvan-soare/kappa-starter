import Button from "components/button";
import { ReactComponent as Logo } from "./logo.svg";
import "./App.css";

const App = function(): JSX.Element {
  const a = 1;
  return (
    <div className="App">
      <header className="App-header">
        <Logo />
        <Button />
        <p>
          Edit
          {" "}
          {a}
          {" "}
          <code>src/App.tsx</code>
          {" "}
          and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
