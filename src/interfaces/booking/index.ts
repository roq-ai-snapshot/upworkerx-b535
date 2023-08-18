import { CompanyInterface } from 'interfaces/company';
import { FreelancerInterface } from 'interfaces/freelancer';
import { GetQueryInterface } from 'interfaces';

export interface BookingInterface {
  id?: string;
  start_date: any;
  end_date: any;
  status: string;
  company_id?: string;
  freelancer_id?: string;
  created_at?: any;
  updated_at?: any;

  company?: CompanyInterface;
  freelancer?: FreelancerInterface;
  _count?: {};
}

export interface BookingGetQueryInterface extends GetQueryInterface {
  id?: string;
  status?: string;
  company_id?: string;
  freelancer_id?: string;
}
