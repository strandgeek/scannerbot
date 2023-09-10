import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface TextFormInputProps {
  name: string;
  label: string;
  type?: string;
}

export const TextFormInput: FC<TextFormInputProps> = ({
  name,
  label,
  type = "text",
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="input"
      render={({ props }) => <input {...props} type={type} />}
    />
  );
};
