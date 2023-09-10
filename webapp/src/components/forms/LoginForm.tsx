import { Form, FormProps } from "../Form";
import { TextFormInput } from "./inputs/TextFormInput";

export interface LoginFormFields {
  username: string;
  password: string;
}

export interface LoginFormProps
  extends Omit<FormProps<LoginFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function LoginForm({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        Login
      </button>
    </div>
  ),
}: LoginFormProps) {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextFormInput name="username" label="Email" type="email" />
      <TextFormInput name="password" label="Password" type="password" />
      {footer}
    </Form>
  );
}
