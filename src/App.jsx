import Game from "./components/Game";
import GlobalHeader from "./components/GlobalHeader";

const App = () => {
  return (
    <div className="container">
      <GlobalHeader />
      <Game />
    </div>
  );
};

export default App;
