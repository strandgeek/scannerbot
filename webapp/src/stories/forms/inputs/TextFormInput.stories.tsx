/* eslint-disable react-hooks/rules-of-hooks */
import { useForm } from "react-hook-form";
import { TextFormInput } from "../../../components/forms/inputs/TextFormInput";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Form } from "../../../components/Form";

const meta: Meta<typeof TextFormInput> = {
  title: 'Forms/Inputs/TextFormInput',
  component: TextFormInput,
};

export default meta;

const schema = yup.object().shape({
  email: yup.string().label('Email').email().required(),
}).required();


export const Default: StoryObj = {
  render: () => {
    const form = useForm<{ email: string }>({
      resolver: yupResolver(schema),
    });
    return (
      <Form form={form} onSubmit={console.log}>
        <TextFormInput
          name="email"
          label="Email"
        />
      </Form>
    );
  },
};