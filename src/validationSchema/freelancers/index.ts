import * as yup from 'yup';

export const freelancerValidationSchema = yup.object().shape({
  title: yup.string().required(),
  skills: yup.string().required(),
  experience: yup.string().required(),
  user_id: yup.string().nullable(),
});
