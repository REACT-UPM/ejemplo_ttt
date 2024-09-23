import { Container, Stack } from "react-bootstrap";
import Game from "./components/Game";
import GlobalHeader from "./components/GlobalHeader";

const App = () => {
  return (
    <Container>
      <Stack>
        <GlobalHeader />
        <Game />
      </Stack>
    </Container>
  );
};

export default App;
