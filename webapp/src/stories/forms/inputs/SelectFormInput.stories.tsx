/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { SelectFormInput } from "../../../components/forms/inputs/SelectFormInput";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../components/Form";

const meta: Meta<typeof SelectFormInput> = {
  title: "Forms/Inputs/SelectFormInput",
  component: SelectFormInput,
};

export default meta;

const schema = yup
  .object()
  .shape({
    fruit: yup.string().label("Fruit").oneOf(["apple", "mango"]).required(),
  })
  .required();

export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ fruit: "apple" | "mango" }>({
      resolver: yupResolver(schema),
      mode: "onChange",
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <SelectFormInput
          name="fruit"
          label="Fruit"
          options={[
            {
              label: "Apple",
              value: "apple",
            },
            {
              label: "Pineapple",
              value: "pineapple",
            },
            {
              label: "Mango",
              value: "mango",
            },
          ]}
        />
      </Form>
    );
  },
};
