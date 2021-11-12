import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react"
import { useStore } from "../../app/stores/store";
import LoginForm from "../Users/LoginForm";
import RegisterForm from "../Users/RegisterForm";

const HomePage = () => {
    const { userStore, modalStore } = useStore()
    return (
        <>
            <Segment inverted textAlign='center' vertical className='homePage' >
                <Container text>
                    <Header as='h1' inverted>
                        <Icon name='heart' />
                        Football Is Amazing !
                    </Header>
                    {userStore.isUserLoggedIn ? (
                        <Button as={Link} to='/dashboard' size='huge' inverted>Go to application !</Button>
                    ) : (
                        <>
                            <Button onClick={() => modalStore.openModal(<LoginForm/>)} size='huge' inverted><Icon name='user' />Sign in ! </Button>
                            <Button onClick={() => modalStore.openModal(<RegisterForm/>)} size='huge' inverted> <Icon name='add user' />Sign up ! </Button>
                        </>
                    )}
                </Container>
            </Segment>
        </>
    )
};


export default observer(HomePage);