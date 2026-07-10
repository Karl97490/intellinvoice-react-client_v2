import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/auth.context";
import authService from "../../services/auth.service";
import validateRequiredFields from "../../utils/validateRequiredFields";
import delay from "../../utils/delay";

const Login = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { storeToken, authenticateUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    console.log("signin process...");
    setIsLogging(true);
    const requiredInputs = validateRequiredFields(signinForm);
    if (requiredInputs.length) {
      setErrorMessage(`${requiredInputs[0]} is required.`);
      return;
    }

    const body = {
      ...signinForm,
    };
    console.log(body);
    try {
      const response = await authService.login(body);
      storeToken(response.data.authToken); // store token in the local storage
      await authenticateUser(); // verify token validity with server
      setIsLogging(false);
    } catch (error) {
      console.log(error.response);
      setIsLogging(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Login component</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignIn}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={signinForm.email}
            onChange={handleChange}
            placeholder="name@flowbite.com"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your password</Label>
          </div>
          <TextInput
            id="password"
            type="password"
            name="password"
            value={signinForm.password}
            onChange={handleChange}
            placeholder="******"
          />
        </div>
        <div className="flex justify-center">
          {errorMessage && (
            <p className="text-red-400 first-letter:uppercase">
              {errorMessage}
            </p>
          )}
        </div>
        <Button type="submit" className="cursor-pointer">
          {isLogging ? (
            <>
              <Spinner aria-label="Spinner loading button" size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            <>Sign In</>
          )}
        </Button>
        <div className="flex justify-center gap-1">
          <p>Don't have an account yet?</p>
          <Link to="/signup" className="text-blue-500 font-medium">
            Please sign up.
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
