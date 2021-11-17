import { observer } from "mobx-react-lite";
import { Grid, GridColumn, Header, List, Icon, Button, Segment } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import ScheduleTable from "./ScheduleTable";


const ScheduleMainPage = () => {

    const { leagueStore } = useStore();
    const { leagues } = leagueStore;

    const getDataForNewDay = (daysToAdd: number) => {
        leagueStore.loadLeaguesForSpecificDate(daysToAdd);
    }

    const areThereMatchesForTodays = () => {
        let result: boolean = false;
        leagues.forEach(league => {
            if (league.matches.length !== 0) {
                result = true;
            }
        });
        return result;
    }

    return (
        <>
            <Segment style={{ background: '#006400' }} loading={leagueStore.loadingInitial}>
                <Segment style={{ background: '#f0e68c' }}>
                    <Header as='h1' size='large'>
                        <Icon name='calendar alternate' />
                        <Header.Content>
                            Todays Matches
                            <Header.Subheader>
                                <Button size='tiny' inverted color='google plus' content='Previous' icon='arrow left' labelPosition='left' style={{ marginRight: 10 }} onClick={() => getDataForNewDay(-1)} />
                                {leagueStore.currentDateAsString}
                                <Button size='tiny' inverted color='google plus' content='Next' icon='arrow right' labelPosition='right' style={{ marginLeft: 10 }} onClick={() => getDataForNewDay(1)} />
                            </Header.Subheader>
                        </Header.Content>
                    </Header>
                </Segment>
                <Segment style={{ background: '#C2B280' }}>
                    <Grid>
                        <GridColumn width='15'>
                            {areThereMatchesForTodays()
                                ?
                                <List>
                                    {leagues.map(league => (
                                        <ScheduleTable key={league.id} leauge={league} />
                                    ))}
                                </List>
                                :
                                <><h2>No matches for day !</h2></>
                            }

                        </GridColumn>
                    </Grid>
                </Segment>
            </Segment>
        </>
    )
};


export default observer(ScheduleMainPage);