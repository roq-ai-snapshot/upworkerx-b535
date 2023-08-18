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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFreelancer } from 'apiSdk/freelancers';
import { freelancerValidationSchema } from 'validationSchema/freelancers';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { FreelancerInterface } from 'interfaces/freelancer';

function FreelancerCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FreelancerInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFreelancer(values);
      resetForm();
      router.push('/freelancers');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FreelancerInterface>({
    initialValues: {
      title: '',
      skills: '',
      experience: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: freelancerValidationSchema,
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
              label: 'Freelancers',
              link: '/freelancers',
            },
            {
              label: 'Create Freelancer',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Freelancer
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.title}
            label={'Title'}
            props={{
              name: 'title',
              placeholder: 'Title',
              value: formik.values?.title,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.skills}
            label={'Skills'}
            props={{
              name: 'skills',
              placeholder: 'Skills',
              value: formik.values?.skills,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.experience}
            label={'Experience'}
            props={{
              name: 'experience',
              placeholder: 'Experience',
              value: formik.values?.experience,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
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
              onClick={() => router.push('/freelancers')}
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
    entity: 'freelancer',
    operation: AccessOperationEnum.CREATE,
  }),
)(FreelancerCreatePage);
