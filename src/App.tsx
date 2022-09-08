import "./App.css";
import Container from '@mui/material/Container'
import MatrixDrawer from "./Components/MatrixDrawer/MatrixDrawer";
function App() {
  return (
    <div className="App">
      <Container maxWidth={"md"}>
      <MatrixDrawer />
      </Container>
    </div>
  );
}

export default App;
