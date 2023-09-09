/* eslint-disable @typescript-eslint/no-misused-promises */
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

export interface FormProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSubmit: (data: T) => void;
  children: React.ReactNode;
}


export function Form<T extends FieldValues>({ form, onSubmit, children}: FormProps<T>) {
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormProvider {...form}>
        {children}
      </FormProvider>
    </form>
  );
}