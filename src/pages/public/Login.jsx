import { Button, Label, TextInput, Spinner, Toast } from "flowbite-react";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
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

    const requiredFields = validateRequiredFields(signinForm);
    if (requiredFields.length) {
      setIsLogging(false);
      setErrorMessage(`${requiredFields[0]} is required.`);
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
      // Logging state loading
      setIsLogging(false);
      // Pop up success toast
      setSuccessToast(true);
      // Redirecting loading state true
      setIsRedirecting(true);
      // Waiting time before redirecting
      await delay(2000);
      // Navigate to dashboard page
      navigate("/dashboard");
    } catch (error) {
      console.log(error.response);
      setIsLogging(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (
        error.response &&
        (error.response.status === 500 || error.response.status === 401)
      ) {
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

  if (isRedirecting) {
    return (
      <>
        {successToast && (
          <Toast className="border border-gray-100 ">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check size={14} />
            </div>
            <div className="ml-3 text-sm font-normal">Signin sucessfully.</div>
          </Toast>
        )}
        <div className="mx-auto flex flex-col gap-2 items-center">
          <Spinner aria-label="Redirecting loading spinner" size="xl" />
          <span className="text-md">Redirecting...</span>
        </div>
      </>
    );
  }

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
