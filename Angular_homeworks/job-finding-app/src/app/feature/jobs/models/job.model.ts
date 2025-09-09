import { workType } from './job.enum';

export interface Job {
  id: number;
  // Mandatory to be shown in the posting
  companyName: string;
  companyLogo: string;
  expires: string;
  position: string;
  startingSalary: number;
  workType: workType;
  // Show the below in the details expanding element
  location: string;
  country: string;
  qualifications: string;
  description: string;
  isApplied: boolean;
  //Shown in the company details page + companyName and companyLogo
  companyAddress: string;
  companyIndustry: string;
  companyWebsite: string;
}
