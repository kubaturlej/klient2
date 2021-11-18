import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Segment } from "semantic-ui-react";

const NotFound = () => {
    return (
        <Segment vertical textAlign='center'>
            <Container text >
                <Header as='h1' inverted>
                    Page not found.
                </Header>
                <Button as={Link} to='/dashboard' size='huge' inverted >Return to Home Page</Button>
            </Container>
        </Segment>
    )
}
export default observer(NotFound);