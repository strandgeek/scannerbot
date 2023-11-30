export interface Me {
  id: string;
  firstName: string;
  lastName: string;
  subscription: {
    id: string;
    startDate: string;
    endDate: string;
    stripeStatus: string;
  } | null;
}
