import { useMutation } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { generateSubscriptionLink } from "../../client/mutations/billing";

export interface SubscriptionProps {}

export const Subscription: FC<SubscriptionProps> = () => {
  const generateLinkMutation = useMutation({
    mutationFn: generateSubscriptionLink,
  });
  useEffect(() => {
    generateLinkMutation
      .mutateAsync()
      .then((data) => (window.location.href = data.url));
  }, []);
  return null;
};
