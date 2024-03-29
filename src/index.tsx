import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "reduxStore/store";
import reportWebVitals from "./reportWebVitals";

const renderEntireTree = () => {
  ReactDOM.render(
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
};

renderEntireTree();
store.subscribe(() => {
  renderEntireTree();
});

reportWebVitals();
