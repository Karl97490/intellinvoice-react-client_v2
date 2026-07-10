import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupForm, setSignupForm] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {}, []);
  const handleSignup = async (e) => {};
  const handleChange = (e) => {};
  return (
    <>
      <h1>Signup component</h1>
      <form className="flex max-w-md flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Your email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            placeholder="name@flowbite.com"
            required
          />
        </div>
        <div className="flex gap-2">
          <div className="mb-2 block w-full">
            <Label htmlFor="firstName">First Name</Label>
            <TextInput id="firstName" type="text" required />
          </div>
          <div className="mb-2 block w-full">
            <Label htmlFor="lastName">Last Name</Label>
            <TextInput id="lastName" type="text" required />
          </div>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password">Your password</Label>
          </div>
          <TextInput id="password" type="password" required />
        </div>
        <div className="flex justify-center">
          <p className="text-red-400">Error Message</p>
        </div>
        <Button type="submit">Register new account</Button>
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
