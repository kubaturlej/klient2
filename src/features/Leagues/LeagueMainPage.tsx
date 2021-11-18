import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useParams } from "react-router";
import { Container, Segment, Image, Grid } from "semantic-ui-react"
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useStore } from "../../app/stores/store";
import LeagueProgessBar from "./LeagueProgessBar";
import LeagueTabs from "./LeagueTabs";


const LeagueMainPage = () => {

    const { teamStore } = useStore();
    const { league } = teamStore;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (id) {
            window.scrollTo(0, 0);
            teamStore.loadLeague(id);
        }
    }, [id, teamStore])

    if (teamStore.loadingInitial || !league) return <LoadingComponent content='App loading ...' />

    return (
        <>
            <Container style={{ marginTop: '7em' }}>
                <Segment raised style={{ background: '#f0e68c' }}>
                    <Grid>
                        <Grid.Column width='2'>
                            <h1><Image  style={{ background: 'white' }} src={league?.logo} bordered size='small' /></h1>
                        </Grid.Column>
                        <Grid.Column width='6'>
                            <h1>{league?.leagueName}</h1>
                            <div className='mySpan'><span style={{ color: "grey" }}> Nation</span> {league!.nationality.charAt(0).toUpperCase() + league!.nationality.slice(1)}</div>
                            <div className='mySpan'><span style={{ color: "grey" }}> Season</span> 2021/2022</div>
                            <div className='mySpan'><span style={{ color: "grey" }}> Teams</span> {league?.teams.length}</div>
                            <div className='mySpan'><span style={{ color: "grey" }}> Matches</span> {league?.matchesCompleted}/{league?.totalMatches} <span style={{ color: "grey" }}> played</span></div>
                        </Grid.Column>
                    </Grid>
                    <Container style={{ marginTop: '2em' }}>
                       <LeagueProgessBar leagueProgress={league?.leagueProgress} />
                    </Container>
                </Segment>
                <LeagueTabs/>
            </Container>
        </>
    )
};

export default observer(LeagueMainPage);