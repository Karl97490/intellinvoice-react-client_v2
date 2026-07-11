import { Textarea, TextInput, Label, Button, Spinner } from "flowbite-react";

const CreateClient = () => {
  return (
    <>
      <h1>CreateClient component</h1>
      <form className="flex max-w-md flex-col gap-4" onSubmit={undefined}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name">Name</Label>
          </div>
          <TextInput
            id="name"
            type="text"
            name="name"
            value={undefined}
            onChange={undefined}
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
            value={undefined}
            onChange={undefined}
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
            value={undefined}
            onChange={undefined}
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
            value={undefined}
            onChange={undefined}
            placeholder="262-895-635"
          />
        </div>
        <div className="flex justify-center">Error message</div>
        <Button type="submit" className="cursor-pointer">
          Save Client
        </Button>
      </form>
    </>
  );
};

export default CreateClient;
