import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { Form, FormProps } from "../Form";
import { TextFormInput } from "./inputs/TextFormInput";

export interface SignupFormFields {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface SignupFormProps
  extends Omit<FormProps<SignupFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function SignupForm({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block flex"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        {import.meta.env.VITE_SCANNERBOT_MODE === "cloud" ? (
          <>
            Signup & Proceed to Checkout <ArrowRightIcon className="w-5 h-5" />
          </>
        ) : (
          <span>Sign up for free</span>
        )}
      </button>
    </div>
  ),
}: SignupFormProps) {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <div className="col">
          <TextFormInput
            name="firstName"
            label="First Name"
            type="text"
            options={{ required: true }}
          />
        </div>
        <div className="col">
          <TextFormInput
            name="lastName"
            label="Last Name"
            type="text"
            options={{ required: true }}
          />
        </div>
      </div>
      <TextFormInput
        name="email"
        label="Email"
        type="email"
        options={{ required: true }}
      />
      <TextFormInput
        name="password"
        label="Password"
        type="password"
        options={{ required: true }}
      />
      {footer}
    </Form>
  );
}
