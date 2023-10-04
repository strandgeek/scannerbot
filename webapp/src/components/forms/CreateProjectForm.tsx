import { Form, FormProps } from "../Form";
import { TextFormInput } from "./inputs/TextFormInput";
import { TronSolcVersionInput } from "./inputs/TronSolcVersionInput";

export interface CreateProjectFormFields {
  name: string;
  solcVersion: string;
}

export interface CreateProjectFormProps
  extends Omit<FormProps<CreateProjectFormFields>, "children"> {
  footer?: React.ReactNode;
}

export function CreateProjectForm({
  form,
  onSubmit,
  footer = (
    <div className="mt-2 flex justify-end">
      <button
        className="btn btn-primary btn-block"
        type="submit"
        disabled={!form.formState.isDirty}
      >
        Create
      </button>
    </div>
  ),
}: CreateProjectFormProps) {
  return (
    <Form form={form} onSubmit={onSubmit}>
      <TextFormInput name="name" label="Name" type="text" />
      <TronSolcVersionInput name="solcVersion" label="TRON solc version" />
      {footer}
    </Form>
  );
}
