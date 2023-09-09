/* eslint-disable react-hooks/rules-of-hooks */
import { Form } from "../components/Form";
import { FormGroup } from "../components/FormGroup";
import { useForm } from "react-hook-form";
import { Meta, StoryObj } from "@storybook/react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const meta: Meta<typeof FormGroup> = {
  component: FormGroup,
};

export default meta;

interface FormValues {
  name: string;
  message: string;
}

const schema = yup.object().shape({
  name: yup.string().min(10).required(),
  message: yup.string().min(10).required(),
}).required();

export const Default: StoryObj = {
  render: () => {
    const form = useForm<FormValues>({
      resolver: yupResolver(schema),
    })
    const onSubmit = (data: FormValues) => {
      console.log('okk')
      console.log(data);
    };
    return (
      <Form form={form} onSubmit={onSubmit}>
        <FormGroup
          type="input"
          label="Name"
          name="name"
          form={form}
          render={({ props }) => (
            <input {...props} placeholder="Name" />
          )}
       />

        <FormGroup
          type="textarea"
          label="Message"
          name="message"
          form={form}
          render={({ props }) => (
            <textarea {...props} placeholder="Name" />
          )}
       />
    
        <button type="submit" className="btn">Submit</button>
      </Form>
    );
  },
};