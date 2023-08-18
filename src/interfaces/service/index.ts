import { FreelancerInterface } from 'interfaces/freelancer';
import { GetQueryInterface } from 'interfaces';

export interface ServiceInterface {
  id?: string;
  name: string;
  description: string;
  freelancer_id?: string;
  created_at?: any;
  updated_at?: any;

  freelancer?: FreelancerInterface;
  _count?: {};
}

export interface ServiceGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  description?: string;
  freelancer_id?: string;
}
