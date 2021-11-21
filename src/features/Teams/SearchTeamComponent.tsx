import { ErrorMessage, Field, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Form, Header, Label, List, Segment, Image } from "semantic-ui-react";
import * as Yup from 'yup';
import { store, useStore } from "../../app/stores/store";

const SearchTeamComponent = () => {

    const { teamStore } = useStore();

    const SigninSchema = Yup.object().shape({
        teamName: Yup.string()
            .required('This pole is required !'),
    });

    const imageRenderer = (item: any) => <Image avatar src={item.logo} />

    return (
        <>
            <Header textAlign='center' content='Search your team' />
            <Formik
                initialValues={{ teamName: '' }}
                onSubmit={(values => store.teamStore.loadSearchResults(values.teamName))}
                validationSchema={SigninSchema}
            >
                {({ handleSubmit, isSubmitting, errors, touched, isValid }) => (
                    <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                        <Field style={{ marginBottom: 10 }} type="text" name="teamName" placeholder="Team Name" />
                        {touched.teamName && errors.teamName &&
                            <ErrorMessage name='error' render={() => <Label style={{ marginTop: 10, marginBottom: 10 }} color='red' content={errors.teamName} />} />
                        }

                        <Button disabled={isSubmitting || !isValid} positive content='Search' type='submit' fluid />
                    </Form>
                )}
            </Formik>

            {teamStore.searchResults.length !== 0 
                ? <Segment>
                    <List selection verticalAlign='middle'>
                        {teamStore.searchResults.map(team => (
                            <List.Item key={team.id}>
                               {imageRenderer(team)}
                                <List.Content as={Link} to={`/team/${team.id}`}>
                                    <List.Header>{team.teamName }</List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
                : <></>
               }
               {teamStore.notFoundResult !== ''  ? <Segment>{teamStore.notFoundResult}</Segment> : <></>}
        </>
    )
};
export default observer(SearchTeamComponent);