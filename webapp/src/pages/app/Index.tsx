import { FC, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../../client/queries/auth";
import { useNavigate } from "react-router-dom";

export const AppIndexPage: FC = () => {
  const navigate = useNavigate();
  const { data: meData, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    retry: false,
  });
  useEffect(() => {
    if (!isLoading) {
      if (meData) {
        navigate(meData.subscription ? "/app/scans" : "/app/subscription");
      } else {
        navigate("/app/login");
      }
    }
  }, [meData, isLoading]);
  return null;
};
