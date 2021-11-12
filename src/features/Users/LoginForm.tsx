import { Formik, Field, ErrorMessage } from 'formik';
import { observer } from 'mobx-react-lite';
import { Button, Container, Form, Header, Label, MessageItem } from 'semantic-ui-react';
import { useStore } from '../../app/stores/store';
import * as Yup from 'yup';

const SigninSchema = Yup.object().shape({
    password: Yup.string()
      .required('This pole is required !'),
      email: Yup.string().email('Invalid email').required('This pole is required !'),
  });

const LoginForm = () => {
    const { userStore } = useStore();
    return (
        <>
            <Header textAlign='center' content='Sign in' />
            <Formik
                initialValues={{ email: '', password: '', error: null }}
                onSubmit={((values, { setErrors }) => userStore.login(values).catch(error =>
                    setErrors({ error: 'Invalid email or password' })))}
                    validationSchema={SigninSchema}
            >
                {({ handleSubmit, isSubmitting, errors, touched, isValid  }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Field style={{ marginBottom: 10 }} type="text" name="email" placeholder="email" />
                        {touched.email && errors.email && <Container style={{marginBottom: 10}}><MessageItem>{errors.email}</MessageItem></Container>}
                        <Field style={{ marginBottom: 10 }} type="password" name="password" placeholder="password" />
                        {touched.password && errors.password && <Container style={{marginBottom: 10}}><MessageItem>{errors.password}</MessageItem></Container>}
                        <ErrorMessage name='error' render={() => <Label style={{ marginTop: 10, marginBottom: 10 }} color='red' content={errors.error} />} />
                        <Button disabled={isSubmitting || !isValid} positive content='Login' type='submit' fluid />
                    </Form>
                )}
            </Formik>
        </>
    )
}

export default observer(LoginForm);