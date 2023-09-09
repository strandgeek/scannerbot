/* eslint-disable react-hooks/rules-of-hooks */
import { Form } from "../components/Form";
import { useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Form> = {
  component: Form,
};

export default meta;

interface FormValues {
  name: string;
  email: string;
}

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>()
    const { register } = form;
    const onSubmit = (data: FormValues) => {
      console.log(data);
    };
    return (
      <Form form={form} onSubmit={onSubmit}>
        <input {...register('name')} className="input input-bordered" placeholder="Name" />
        <input {...register('email')} className="input input-bordered" placeholder="Email" />
        <button type="submit" className="btn">Submit</button>
      </Form>
    );
  },
};