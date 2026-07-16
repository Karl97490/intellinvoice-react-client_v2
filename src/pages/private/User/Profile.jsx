import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import { Label, TextInput, Textarea, Button, Spinner } from "flowbite-react";
import userService from "../../../services/user.service";
import validateRequiredFields from "../../../utils/validateRequiredFields";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userForm, setUserForm] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    email: user.email || "",
    company: {
      name: user?.company?.name || "",
      email: user?.company?.email || "",
      address: user?.company?.address || "",
      phone: user?.company?.phone || "",
    },
  });
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const section = e.target.dataset.section;

    if (section) {
      setUserForm((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: value,
        },
      }));
      return;
    }

    setUserForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    console.log("updating profile user with id: " + user._id);

    const requiredFields = validateRequiredFields(userForm);
    if (requiredFields.length) {
      console.log(requiredFields);
      if (
        ["firstName", "lastName"].some((field) =>
          requiredFields.includes(field),
        )
      ) {
        setErrorMessage("First and last name are required.");
      }
      return;
    }

    const body = {
      ...userForm,
    };
    console.log(body);
    try {
      const response = await userService.updateUser(user._id, body);
      console.log(response);
    } catch (error) {
      console.log(error.response);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again");
      }
    }
  };

  return (
    <>
      <h1>Profile component</h1>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleUpdateProfile}
      >
        <h2>Connexion information</h2>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="firstName">First Name</Label>
          </div>
          <TextInput
            id="firstName"
            name="firstName"
            type="text"
            value={userForm.firstName}
            onChange={handleChange}
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
            value={userForm.lastName}
            onChange={handleChange}
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
            value={userForm.email}
            disabled
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
            value={userForm.company.name}
            onChange={handleChange}
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
            value={userForm.company.email}
            onChange={handleChange}
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
            value={userForm.company.address}
            onChange={handleChange}
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
            value={userForm.company.phone}
            onChange={handleChange}
            placeholder="262-895-635"
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
