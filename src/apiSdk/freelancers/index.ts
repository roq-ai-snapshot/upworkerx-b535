import axios from 'axios';
import queryString from 'query-string';
import { FreelancerInterface, FreelancerGetQueryInterface } from 'interfaces/freelancer';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFreelancers = async (
  query?: FreelancerGetQueryInterface,
): Promise<PaginatedInterface<FreelancerInterface>> => {
  const response = await axios.get('/api/freelancers', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFreelancer = async (freelancer: FreelancerInterface) => {
  const response = await axios.post('/api/freelancers', freelancer);
  return response.data;
};

export const updateFreelancerById = async (id: string, freelancer: FreelancerInterface) => {
  const response = await axios.put(`/api/freelancers/${id}`, freelancer);
  return response.data;
};

export const getFreelancerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/freelancers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFreelancerById = async (id: string) => {
  const response = await axios.delete(`/api/freelancers/${id}`);
  return response.data;
};
