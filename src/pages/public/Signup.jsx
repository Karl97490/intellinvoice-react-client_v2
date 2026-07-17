import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Label, TextInput, Spinner, Toast } from "flowbite-react";
import { Check } from "lucide-react";
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
    setIsSignuping(true);

    const requiredFields = validateRequiredFields(signupForm);
    if (requiredFields.length) {
      setIsSignuping(false);
      if (
        ["firstName", "lastName"].some((field) =>
          requiredFields.includes(field),
        )
      ) {
        setErrorMessage("First name and last name are required.");
        return;
      }
      setErrorMessage(`${requiredFields[0]} is required.`);
      return;
    }

    const body = {
      ...signupForm,
    };
    try {
      const response = await authService.signup(body);
      setIsSignuping(false);
      // Pop up Toast Success signup
      setSuccessToast(true);
      // Redirecting loading state true
      setIsRedirecting(true);
      // Waiting time before redirecting
      await delay(2000);
      // Redirecting to loging page
      navigate("/login");
    } catch (error) {
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
      <div className="flex min-h-screen w-full items-center justify-center px-4">
        {successToast && (
          <Toast className="absolute top-6 border border-gray-100 shadow-sm">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check size={14} />
            </div>
            <div className="ml-3 text-sm font-normal">Signup sucessfully.</div>
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
            Create your account
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Start managing your clients and invoices in one place.
          </p>
        </div>

        <form className="flex flex-col gap-5" onSubmit={handleSignup}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName" value="First Name" />
              <TextInput
                id="firstName"
                type="text"
                name="firstName"
                value={signupForm.firstName}
                onChange={handleChange}
                placeholder="John"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" value="Last Name" />
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

          <div className="space-y-2">
            <Label htmlFor="email" value="Your email" />
            <TextInput
              id="email"
              type="email"
              name="email"
              value={signupForm.email}
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
              value={signupForm.password}
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

          <Button
            type="submit"
            className="h-11 cursor-pointer rounded-lg"
            disabled={isSignuping}
          >
            {isSignuping ? (
              <>
                <Spinner aria-label="Spinner loading button" size="sm" />
                <span className="pl-3">Loading...</span>
              </>
            ) : (
              <>Create account</>
            )}
          </Button>

          <div className="flex justify-center gap-1 text-sm text-gray-600 dark:text-gray-300">
            <p>Already have an account?</p>
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Please log in.
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
