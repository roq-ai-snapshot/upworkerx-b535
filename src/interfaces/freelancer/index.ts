import { BookingInterface } from 'interfaces/booking';
import { ServiceInterface } from 'interfaces/service';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface FreelancerInterface {
  id?: string;
  title: string;
  skills: string;
  experience: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;
  booking?: BookingInterface[];
  service?: ServiceInterface[];
  user?: UserInterface;
  _count?: {
    booking?: number;
    service?: number;
  };
}

export interface FreelancerGetQueryInterface extends GetQueryInterface {
  id?: string;
  title?: string;
  skills?: string;
  experience?: string;
  user_id?: string;
}
