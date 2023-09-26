/* eslint-disable @typescript-eslint/no-misused-promises */
import { FC } from "react";
import { LoginForm, LoginFormFields } from "../../components/forms/LoginForm";
import { useForm } from "react-hook-form";
import LogoSrc from "../../assets/scannerbot-logo-with-slogan.png";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../client/mutations/login";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../../consts/paths";
import { AxiosError } from "axios";
import { toast } from "react-toastify";

export const AppLoginPage: FC = () => {
  const form = useForm<LoginFormFields>();
  const createUserMutation = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
  });
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormFields) => {
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
        <LoginForm form={form} onSubmit={onSubmit} />
      </div>
    </div>
  );
};
