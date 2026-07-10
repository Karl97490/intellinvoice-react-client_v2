import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput, Spinner } from "flowbite-react";
import { Link } from "react-router-dom";
import authService from "../../services/auth.service";

const Signup = () => {
  const [signupForm, setSignupForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSignuping, setIsSignuping] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("signup...");
    setIsSignuping(true);

    const missingInput = Object.keys(signupForm).filter(
      (key) => signupForm[key] === "",
    );
    if (missingInput.length) {
      console.log(missingInput);
      setIsSignuping(false);
      if (missingInput[0] === "firstName" || missingInput[0] === "lastName") {
        setErrorMessage("First name and last name are required.");
        return;
      }
      setErrorMessage(`${missingInput[0]} is required.`);
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
        <Button type="submit" className="cursor-pointer">
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
