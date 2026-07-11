import {
  Textarea,
  TextInput,
  Label,
  Button,
  Spinner,
  Toast,
} from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/auth.context";
import clientService from "../../../services/client.service";
import validateRequiredFields from "../../../utils/validateRequiredFields";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import delay from "../../../utils/delay";

const CreateClient = () => {
  const [clientForm, setClientForm] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });
  const [isCreating, setIsCreating] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [successToast, setSuccessToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateClient = async (e) => {
    e.preventDefault();
    console.log("creating client...");
    setIsCreating(true);

    const requiredInputs = validateRequiredFields(clientForm);
    if (requiredInputs.length) {
      console.log(requiredInputs);
      if (["name, address"].some((field) => requiredInputs.includes(field))) {
        setErrorMessage("Name and address are required.");
        return;
      }
    }

    const body = {
      ...clientForm,
    };
    console.log(body);
    try {
      const response = await clientService.createClient(body);
      console.log(response);
      setIsCreating(false);
      setSuccessToast(true);
      setIsRedirecting(true);
      await delay(2000);
      navigate("/clients");
    } catch (error) {
      console.log(error.response);
      setIsCreating(false);
      if (error.response && error.response.status === 400) {
        setErrorMessage(error.response.data.message);
      }
      if (error.response && error.response.status === 500) {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  if (isRedirecting) {
    return (
      <>
        {successToast && (
          <Toast className="border border-gray-100 ">
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
              <Check size={14} />
            </div>
            <div className="ml-3 text-sm font-normal">
              Save client sucessfully.
            </div>
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
      <h1>CreateClient component</h1>
      <form
        className="flex max-w-md flex-col gap-4"
        onSubmit={handleCreateClient}
      >
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={clientForm.name}
            onChange={handleChange}
            placeholder="John Doe"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email">Email</Label>
          </div>
          <TextInput
            id="email"
            type="email"
            name="email"
            value={clientForm.email}
            onChange={handleChange}
            placeholder="john.doe@mail.com"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="address">Address</Label>
          </div>
          <Textarea
            id="address"
            name="address"
            value={clientForm.address}
            onChange={handleChange}
            placeholder="Type your address..."
            rows={4}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="phone">Phone</Label>
          </div>
          <TextInput
            id="phone"
            name="phone"
            type="text"
            value={clientForm.phone}
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
          {isCreating ? (
            <>
              <Spinner aria-label="Spinner loading button" size="sm" />
              <span className="pl-3">Saving...</span>
            </>
          ) : (
            <>Save client</>
          )}
        </Button>
      </form>
    </>
  );
};

export default CreateClient;
