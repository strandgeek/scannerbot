import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface TextFormInputProps {
  name: string;
  label: string;
}

export const TextFormInput: FC<TextFormInputProps> = ({ name, label }) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="input"
      render={({ props }) => <input {...props} />}
    />
  );
};
