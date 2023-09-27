import { Project } from "./project";

export interface ProjectScan {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  project?: Project;
  output?: {
    files: [
      {
        path: string;
        reports: [
          {
            type: 'LOW' | 'MODERATE' | 'HIGH';
            message: string;
          }
        ]
      }
    ]
  }
}