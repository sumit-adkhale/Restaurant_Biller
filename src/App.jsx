import "./App.css";
import MainHeader from "./components/MainHeader";
import Routers from "./components/Routers";

function App() {
  return (
    <>
    <div className="w-full h-full min-h-screen px-10">
    <MainHeader />
      <Routers/>
    </div>
    </>
  );
}

export default App;
