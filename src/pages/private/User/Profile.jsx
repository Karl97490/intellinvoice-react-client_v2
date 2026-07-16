import { useContext } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { Label, TextInput, Textarea, Button, Spinner } from "flowbite-react";

const Profile = () => {
  const { user } = useContext(AuthContext);
  return (
    <>
      <h1>Profile component</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={undefined}>
        <h2>Connexion information</h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName">First Name</Label>
          </div>
          <TextInput
            id="firstName"
            name="firstName"
            type="text"
            value={undefined}
            onChange={undefined}
            placeholder="John"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="lastName">Last Name</Label>
          </div>
          <TextInput
            id="lastName"
            name="lastName"
            type="text"
            value={undefined}
            onChange={undefined}
            placeholder="Doe"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            name="email"
            type="email"
            value={undefined}
            onChange={undefined}
            placeholder="john.doe@mail.com"
          />
        </div>
        <h2>Company information</h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="company-name">Name</Label>
          </div>
          <TextInput
            id="company-name"
            name="name"
            data-section="company"
            type="text"
            value={undefined}
            onChange={undefined}
            placeholder="Company ABC"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="company-email">Email</Label>
          </div>
          <TextInput
            id="company-email"
            name="email"
            data-section="company"
            type="text"
            value={undefined}
            onChange={undefined}
            placeholder="company.abc@email.com"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="company-address">Address</Label>
          </div>
          <Textarea
            id="company-address"
            name="address"
            data-section="company"
            value={undefined}
            onChange={undefined}
            placeholder="Type your address..."
            rows={4}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="company-phone">Phone</Label>
          </div>
          <TextInput
            id="company-phone"
            name="phone"
            data-section="company"
            type="text"
            value={undefined}
            onChange={undefined}
            placeholder="262-895-635"
          />
        </div>
        <div className="flex justify-center">
          <p className="text-red-400 first-letter:uppercase">Error Message</p>
          {/* {errorMessage && (
            <p className="text-red-400 first-letter:uppercase">
              {errorMessage}
            </p>
          )} */}
        </div>
        <Button type="submit" className="cursor-pointer">
          Save profile
          {/* {isCreating ? (
            <>
              <Spinner aria-label="Spinner loading button" size="sm" />
              <span className="pl-3">Saving...</span>
            </>
          ) : (
            <>Save client</>
          )} */}
        </Button>
      </form>
    </>
  );
};

export default Profile;
