import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getBookingById, updateBookingById } from 'apiSdk/bookings';
import { bookingValidationSchema } from 'validationSchema/bookings';
import { BookingInterface } from 'interfaces/booking';
import { CompanyInterface } from 'interfaces/company';
import { FreelancerInterface } from 'interfaces/freelancer';
import { getCompanies } from 'apiSdk/companies';
import { getFreelancers } from 'apiSdk/freelancers';

function BookingEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<BookingInterface>(
    () => (id ? `/bookings/${id}` : null),
    () => getBookingById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: BookingInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateBookingById(id, values);
      mutate(updated);
      resetForm();
      router.push('/bookings');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: 'Update Forbidden' });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<BookingInterface>({
    initialValues: data,
    validationSchema: bookingValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Bookings',
              link: '/bookings',
            },
            {
              label: 'Update Booking',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Booking
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <FormControl id="start_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Start Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.start_date ? new Date(formik.values?.start_date) : null}
              onChange={(value: Date) => formik.setFieldValue('start_date', value)}
            />
          </FormControl>
          <FormControl id="end_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              End Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.end_date ? new Date(formik.values?.end_date) : null}
              onChange={(value: Date) => formik.setFieldValue('end_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.status}
            label={'Status'}
            props={{
              name: 'status',
              placeholder: 'Status',
              value: formik.values?.status,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<CompanyInterface>
            formik={formik}
            name={'company_id'}
            label={'Select Company'}
            placeholder={'Select Company'}
            fetcher={getCompanies}
            labelField={'name'}
          />
          <AsyncSelect<FreelancerInterface>
            formik={formik}
            name={'freelancer_id'}
            label={'Select Freelancer'}
            placeholder={'Select Freelancer'}
            fetcher={getFreelancers}
            labelField={'title'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/bookings')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'booking',
    operation: AccessOperationEnum.UPDATE,
  }),
)(BookingEditPage);
