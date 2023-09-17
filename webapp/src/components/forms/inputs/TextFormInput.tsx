import { FC } from "react";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface TextFormInputProps {
  name: string;
  label: string;
  type?: string;
  options?: RegisterOptions;
}

export const TextFormInput: FC<TextFormInputProps> = ({
  name,
  label,
  type = "text",
  options,
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="input"
      render={({ props }) => <input {...props} type={type} />}
      options={options}
    />
  );
};
