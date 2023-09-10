import { FC } from "react";
import { LoginForm, LoginFormFields } from "../../components/forms/LoginForm";
import { useForm } from "react-hook-form";
import LogoSrc from "../../assets/scannerbot-logo-with-slogan.png";

export const AppLoginPage: FC = () => {
  const form = useForm<LoginFormFields>();
  return (
    <div>
      <div>
        <img src={LogoSrc} className="mx-auto h-40 mt-48" />
      </div>
      <div className="max-w-xl mx-auto border p-8 mt-8 rounded-md">
        <LoginForm form={form} onSubmit={console.log} />
      </div>
    </div>
  );
};
