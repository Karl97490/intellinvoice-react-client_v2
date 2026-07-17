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
    try {
      const response = await authService.login(body);
      storeToken(response.data.authToken); // store token in the local storage
      await authenticateUser(); // verify token validity with server
    } catch (error) {
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
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        {successToast && (
          <Toast className="absolute top-6 z-100 border border-gray-100 shadow-sm">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check size={14} />
            </div>
            <div className="ml-3 text-sm font-normal">Signin sucessfully.</div>
          </Toast>
        )}
        <div className="mx-auto flex flex-col items-center gap-3 rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <Spinner aria-label="Redirecting loading spinner" size="xl" />
          <span className="text-md font-medium text-gray-700 dark:text-gray-200">
            Redirecting...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-10">
        <div className="mb-8 space-y-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Welcome back
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Sign in to continue managing your clients and invoices.
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSignIn}>
          <div className="space-y-2">
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={signinForm.email}
              onChange={handleChange}
              placeholder="name@flowbite.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" value="Your password" />
            <TextInput
              id="password"
              type="password"
              name="password"
              value={signinForm.password}
              onChange={handleChange}
              placeholder="******"
            />
          </div>

          <div className="min-h-6 text-center">
            {errorMessage && (
              <p className="text-sm text-red-500 first-letter:uppercase">
                {errorMessage}
              </p>
            )}
          </div>

          <Button type="submit" className="h-11 cursor-pointer rounded-lg">
            {isLogging ? (
              <>
                <Spinner aria-label="Spinner loading button" size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              <>Sign In</>
            )}
          </Button>

          <div className="flex justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Don't have an account yet?</p>
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Please sign up.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
