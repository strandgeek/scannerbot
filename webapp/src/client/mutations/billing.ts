import { api } from "../api";

export const generateSubscriptionLink = async () => {
  const { data } = await api.post<{ url: string }>('/billing/generate-subscription-link');
  return data;
}

export const generateBillingPortalLink = async () => {
  const { data } = await api.post<{ url: string }>('/billing/generate-billing-portal-link');
  return data;
}
