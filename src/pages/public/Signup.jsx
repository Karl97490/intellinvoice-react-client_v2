import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Label,
  TextInput,
  Spinner,
  Toast,
  ToastToggle,
} from "flowbite-react";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";
import delay from "../../utils/delay";
import validateRequiredFields from "../../utils/validateRequiredFields";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSignuping, setIsSignuping] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("signup...");
    setIsSignuping(true);

    const requiredInputs = validateRequiredFields(signupForm);
    if (requiredInputs.length) {
      console.log(requiredInputs);
      setIsSignuping(false);
      if (
        requiredInputs[0] === "firstName" ||
        requiredInputs[0] === "lastName"
      ) {
        setErrorMessage("First name and last name are required.");
        return;
      }
      setErrorMessage(`${requiredInputs[0]} is required.`);
      return;
    }
    const body = {
      ...signupForm,
    };
    try {
      const response = await authService.signup(body);
      console.log(body);
      setIsSignuping(false);
      console.log(response);
      // Pop up Toast Success signup
      setSuccessToast(true);
      // Redirecting loading state true
      setIsRedirecting(true);
      // Waiting time before redirecting
      await delay(2000);
      // Redirecting to loging page
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      setIsSignuping(false);
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
    setSignupForm((prev) => ({
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
            <div className="ml-3 text-sm font-normal">Signup sucessfully.</div>
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
      <h1>Signup component</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={handleSignup}>
        <div className="flex gap-2">
          <div className="mb-2 block w-full">
            <Label htmlFor="firstName">First Name</Label>
            <TextInput
              id="firstName"
              type="text"
              name="firstName"
              value={signupForm.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </div>
          <div className="mb-2 block w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <TextInput
              id="lastName"
              type="text"
              name="lastName"
              value={signupForm.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={signupForm.email}
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
            value={signupForm.password}
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
        <Button type="submit" className="cursor-pointer" disabled={isSignuping}>
          {isSignuping ? (
            <>
              <Spinner aria-label="Spinner loading button" size="sm" />
              <span className="pl-3">Loading...</span>
            </>
          ) : (
            <>Register new account</>
          )}
        </Button>
        <div className="flex justify-center gap-1">
          <p>Already have an account?</p>
          <Link to="/login" className="text-blue-500 font-medium">
            Please log in.
          </Link>
        </div>
      </form>
    </>
  );
};

export default Signup;
