import { Button } from "flowbite-react";
import { useEffect } from "react";
import authService from "./services/auth.service";

function App() {
  useEffect(() => {
    testAuthService();
  });

  const testAuthService = async () => {
    try {
      const response = await authService.test();
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
