import { observer } from "mobx-react-lite";
import { Container, Header, Segment } from "semantic-ui-react";

const ServerError = () => {
    return (
        <Segment vertical textAlign='center'>
            <Container text >
                <Header as='h1' inverted>
                    Internal Server Error.
                </Header>
            </Container>
        </Segment>
    )
}
export default observer(ServerError);