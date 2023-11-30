import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { getMe } from "../../client/queries/auth";
import { useNavigate } from "react-router-dom";

export interface SubscriptionProps {}

export const SubscriptionCompleted: FC<SubscriptionProps> = () => {
  const navigate = useNavigate();
  const { data: meData } = useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(),
    networkMode: "always",
    refetchInterval: 2000,
    cacheTime: 0,
    staleTime: 0,
  });
  useEffect(() => {
    if (meData?.subscription?.id) {
      navigate("/app/projects/create");
    }
  }, [meData]);
  return <div></div>;
};
