export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  subscription?: {
    id: string;
    startDate: string;
    endDate: string;
  } | null;
}
