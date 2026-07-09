import { Button } from "flowbite-react";
import service from "./services/index.service";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    testApi();
  });

  const testApi = async () => {
    try {
      const response = await service.test();
      console.log(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <>
      <h1>This is App component</h1>
      <Button>Click me</Button>
    </>
  );
}

export default App;
