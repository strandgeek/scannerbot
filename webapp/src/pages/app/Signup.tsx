/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import {
  SignupForm,
  SignupFormFields,
} from "../../components/forms/SignupForm";
import { useForm } from "react-hook-form";
import LogoSrc from "../../assets/scannerbot-logo-with-slogan.png";
import { useMutation } from "@tanstack/react-query";
import { createUser } from "../../client/mutations/users";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../consts/paths";

export const AppSignupPage: FC = () => {
  const form = useForm<SignupFormFields>();
  const createUserMutation = useMutation({
    mutationFn: createUser,
    mutationKey: ["create-user"],
  });
  const navigate = useNavigate();
  const onSubmit = async (data: SignupFormFields) => {
    try {
      const { token } = await createUserMutation.mutateAsync(data);
      localStorage.setItem("token", token);
      navigate(PATHS.app);
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err?.response?.data?.message || "Internal Server Error");
    }
  };
  return (
    <div>
      <div>
        <img src={LogoSrc} className="mx-auto h-40 mt-48" />
      </div>
      <div className="max-w-xl mx-auto border p-8 mt-8 rounded-md">
        <SignupForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
