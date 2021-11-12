import { Formik, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Container, Form, Header, Label, MessageItem } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';


const SignupSchema = Yup.object().shape({
    nickname: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('This pole is required !'),
    email: Yup.string().email('Invalid email').required('This pole is required !'),
    password: Yup.string()
    .required('This pole is required !'),
    confirmPassword: Yup.string()
    .required('This pole is required !'),
  });


const RegisterForm = () => {
    const { userStore, modalStore } = useStore();
    return (
        <>
            <Header textAlign='center' content='Sign up' />
            <Formik
                initialValues={{ dateOfBirth: '', confirmPassword: '', nationality: '', nickname: '', email: '', password: '', error: [] }}
                onSubmit={((values, { setErrors }) => userStore.register(values).catch(error =>
                    setErrors({ error: modalStore.errors })))}
                    validationSchema={SignupSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, touched }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Field style={{ marginBottom: 10 }} type="text" name="nickname" placeholder="nickname" />
                        {touched.nickname && errors.nickname && <Container style={{marginBottom: 10}}><MessageItem>{errors.nickname}</MessageItem></Container>}
                        <Field style={{ marginBottom: 10 }} type="text" name="email" placeholder="email" />
                        {touched.email && errors.email && <Container style={{marginBottom: 10}}><MessageItem>{errors.email}</MessageItem></Container>}
                        <Field style={{ marginBottom: 10 }} type="date" name="dateOfBirth" placeholder="date of birth" />
                        <Field style={{ marginBottom: 10 }} type="password" name="password" placeholder="password" />
                        {touched.password && errors.password && <Container style={{marginBottom: 10}}><MessageItem>{errors.password}</MessageItem></Container>}
                        <Field style={{ marginBottom: 10 }} type="password" name="confirmPassword" placeholder="confirmPassword" />
                        {touched.confirmPassword && errors.confirmPassword && <Container style={{marginBottom: 10}}><MessageItem>{errors.confirmPassword}</MessageItem></Container>}
                        <ErrorMessage name='error' render={() => <Label style={{ marginTop: 10, marginBottom: 10 }} color='red' content={errors.error} />} />
                        <Button disabled={isSubmitting || !isValid} positive content='Register' type='submit' fluid />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default observer(RegisterForm);