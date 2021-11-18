import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Grid, Segment, Image, Button, GridRow, Header, Label, Flag, Container } from "semantic-ui-react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import TeamTabs from "./TeamTabs";


const TeamMainPage = () => {

    const { teamStore } = useStore();
    const { team } = teamStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            window.scrollTo(0, 0);
            teamStore.loadTeam(id);
        }
    }, [id, teamStore])

    const getMatchHistory = () => {
        const tokens = team!.macthesHistory.split(',');

        return tokens;
    }
    const flagRenderer = (nat: any) => <Flag name={nat} />

    if (teamStore.loadingInitial || !team) return <LoadingComponent content='App loading ...' />

    return (
        <>
            <Segment raised style={{ background: '#4169e1' }}>
                <Grid columns={3}>
                    <GridRow style={{ background: '#4169e1' }} >
                        <Grid.Column width='5'>
                            <Image src={team?.logo} size='tiny' />
                            <Header inverted>{flagRenderer(team.teamNationality)}{team?.teamName}</Header>
                        </Grid.Column>
                        <Grid.Column style={{ marginTop: 10 }} >
                            <Header content='Match history' inverted />
                            {getMatchHistory().map((match, i) => (
                                <Label color={match === 'W' ? 'green' : 'red'} key={i}>{match}</Label>
                            ))}
                            <Header inverted={true}>Place in league </Header>
                            <Label color='yellow'>{team.standing}</Label>
                        </Grid.Column>
                        <Grid.Column style={{ marginTop: 10 }} >
                            <Header content='League results' inverted />
                            <Label color='orange'>{team.wins}W</Label> <Label color='orange'>{team.draws}D</Label> <Label color='orange'>{team.losses}L</Label>
                            <Header inverted={true}>Goals balance </Header>
                            <Label color='olive'>{team.goalBalance}</Label>
                        </Grid.Column>
                    </GridRow>
                    <GridRow color='blue'>
                        <Grid.Column>
                            <Button content={'Follow !'} inverted />
                        </Grid.Column>
                        <Grid.Column >
                        </Grid.Column>
                    </GridRow >
                </Grid>
            </Segment>
            <Container>
                <TeamTabs/>
            </Container>
        </>
    )
};

export default observer(TeamMainPage);