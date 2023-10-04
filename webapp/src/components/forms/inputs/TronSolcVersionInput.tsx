import React, { FC, useMemo } from "react";
import { SelectFormInput, SelectFormInputProps } from "./SelectFormInput";

export interface TronSolcVersionInputProps
  extends Omit<SelectFormInputProps, "options"> {}

const VERSIONS = [
  "0.4.24",
  "0.4.25",
  "0.5.4",
  "0.5.8",
  "0.5.10",
  "0.5.12",
  "0.5.13",
  "0.5.14",
  "0.5.15",
  "0.5.16",
  "0.5.17",
  "0.5.18",
  "0.6.0",
  "0.6.2",
  "0.6.8",
  "0.6.12",
  "0.6.13",
  "0.7.0",
  "0.7.6",
  "0.7.7",
  "0.8.0",
  "0.8.6",
  "0.8.7",
  "0.8.11",
  "0.8.18",
];

export const TronSolcVersionInput: FC<TronSolcVersionInputProps> = (props) => {
  const options = useMemo(
    () => VERSIONS.map((value) => ({ label: value, value })),
    [VERSIONS]
  );
  return (
    <SelectFormInput name={props.name} label={props.label} options={options} />
  );
};
