import { Button } from "flowbite-react";
import { useEffect } from "react";
import authService from "./services/auth.service";

function App() {
  return (
    <>
      <h1>This is App component</h1>
      <Button>Click me</Button>
    </>
  );
}

export default App;
