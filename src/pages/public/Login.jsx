import { Button, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";
const Login = () => {
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
            value={undefined}
            onChange={undefined}
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
            value={undefined}
            onChange={undefined}
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
