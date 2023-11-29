import { useMutation } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { generateSubscriptionLink } from "../../client/mutations/billing";

export interface SubscriptionProps {}

export const Subscription: FC<SubscriptionProps> = (props) => {
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
