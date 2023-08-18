import * as yup from 'yup';

export const serviceValidationSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  freelancer_id: yup.string().nullable(),
});
