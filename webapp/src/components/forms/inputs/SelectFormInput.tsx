import { FC } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup } from "../../FormGroup";

export interface SelectFormInputOption {
  label: string;
  value: string;
}

export interface SelectFormInputProps {
  name: string;
  label: string;
  options: SelectFormInputOption[];
}

export const SelectFormInput: FC<SelectFormInputProps> = ({
  name,
  label,
  options = [],
}) => {
  const form = useFormContext();
  return (
    <FormGroup
      form={form}
      name={name}
      label={label}
      type="select"
      render={({ props }) => (
        <select {...props}>
          {options.map(({ label, value }) => (
            <option value={value}>{label}</option>
          ))}
        </select>
      )}
    />
  );
};
