import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [signinForm, setSigninForm] = useState({
    email: "",
    password: "",
  });
  const [isLogging, setIsLogging] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successToast, setSuccessToast] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {};

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
      <form className="flex max-w-md flex-col gap-4" onSubmit={undefined}>
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
          <p className="text-red-400 first-letter:uppercase">Error Message</p>
        </div>
        <Button type="submit" className="cursor-pointer">
          Sign In
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
