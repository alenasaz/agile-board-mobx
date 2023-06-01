import useStore from "./hooks/useStore";
import { observer } from "mobx-react-lite";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Dashboard />
      </main>
    </div>
  );
}

export default observer(App);
