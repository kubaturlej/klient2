import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Container, Header, List, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";


const UserProfile = () => {

    const { userStore, teamStore } = useStore();
    const { user } = userStore;

    const imageRenderer = (item: any) => <Image avatar src={item.logo} />

    return (
        <>
            <Segment textAlign='center'>
                <Container text >
                    <Header as='h1'>
                        {user?.nickName}
                    </Header>
                </Container>
            </Segment>

            {teamStore.favoritesTeams.length !== 0
                ? <Segment>
                    <Header as='h1'>
                        Following Teams
                    </Header>
                    <List selection verticalAlign='middle'>
                        {teamStore.favoritesTeams.map(team => (
                            <List.Item key={team.id}>
                                {imageRenderer(team)}
                                <List.Content as={Link} to={`/team/${team.id}`}>
                                    <List.Header>{team.teamName}</List.Header>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </Segment>
                : <><Segment>
                    <Button content='Search for favorite teams !'/>
                </Segment></>
            }
        </>
    )
}
export default observer(UserProfile);