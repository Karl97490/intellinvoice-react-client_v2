import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import {
  Label,
  TextInput,
  Textarea,
  Button,
  Spinner,
  Card,
} from "flowbite-react";
import userService from "../../../services/user.service";
import validateRequiredFields from "../../../utils/validateRequiredFields";
import delay from "../../../utils/delay";
import NotificationToast from "../../../components/ui/NotificationToast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, authenticateUser } = useContext(AuthContext);
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
  const [isUpdating, setIsUpdating] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const navigate = useNavigate();

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
    setIsUpdating(true);

    const requiredFields = validateRequiredFields(userForm);
    if (requiredFields.length) {
      setIsUpdating(false);
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
    try {
      const response = await userService.updateUser(user._id, body);
      await delay(2000);
      setIsUpdating(false);
      await authenticateUser();
      setSuccessToast(true);
      await delay(2000);
      setSuccessToast(false);
    } catch (error) {
      setIsUpdating(false);
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
      {successToast && (
        <NotificationToast
          status="success"
          message="Profile saved successfully"
        />
      )}
      <section>
        <form onSubmit={handleUpdateProfile}>
          <Card className="mb-4">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-y-1">
                <h2 className="dark:text-white">Profile</h2>
                <p className="dark:text-white">
                  All your personnal and company informations.
                </p>
              </div>
              <div className="flex gap-x-2">
                <Button
                  color="alternative"
                  className="cursor-pointer"
                  onClick={() => navigate(-1)}
                >
                  Back
                </Button>
                <Button type="submit" className="cursor-pointer">
                  {isUpdating ? (
                    <>
                      <Spinner aria-label="Spinner loading button" size="sm" />
                      <span className="pl-3">Saving...</span>
                    </>
                  ) : (
                    <>Save profile</>
                  )}
                </Button>
              </div>
            </div>
          </Card>
          <div className="p-4 border border-gray-500 border-dashed rounded">
            <div className="flex justify-center">
              {errorMessage && (
                <p className="text-red-400 first-letter:uppercase">
                  {errorMessage}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-y-5">
              <Card>
                <h3>Connexion information</h3>
                <div className="flex flex-col gap-y-2">
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
                </div>
              </Card>
              <Card>
                <h3>Company information</h3>
                <div className="flex flex-col gap-y-2">
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
                </div>
              </Card>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default Profile;
