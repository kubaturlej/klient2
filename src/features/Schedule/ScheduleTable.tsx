import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Header, Icon, Image, Segment, Table } from "semantic-ui-react";
import { League } from "../../app/models/league";
import { useStore } from "../../app/stores/store";

interface Props {
    leauge: League;
}

const ScheduleTable = ({ leauge }: Props) => {

    const isInProgress = (time: string) => {

        const todayDate = new Date();
        const currentTime = todayDate.getHours() + ":" + todayDate.getMinutes() + ":" + todayDate.getSeconds();
        const currentDate = todayDate.getFullYear() + ':' + (todayDate.getMonth() + 1) + ':' + todayDate.getDate();
        const matchInMiliseconds = 5400000;
        const matchBreakInMilisecond = 900000;

        const currentTimeTokens = currentTime.split(':');
        const currentDateTokens = currentDate.split(':');
        const matchTimeTokens = time.split(':');

        const matchDate = new Date(parseInt(currentDateTokens[0]), parseInt(currentDateTokens[1]), parseInt(currentDateTokens[2]), parseInt(matchTimeTokens[0]), parseInt(matchTimeTokens[1]), 0).getTime();
        const currnetDate = new Date(parseInt(currentDateTokens[0]), parseInt(currentDateTokens[1]), parseInt(currentDateTokens[2]), parseInt(currentTimeTokens[0]), parseInt(currentTimeTokens[1]), 0).getTime();


        if ((matchDate + matchInMiliseconds + matchBreakInMilisecond) > currnetDate && matchDate < currnetDate) return true;

        return false;
    }

    const { leagueStore } = useStore();
    const { favoriteMatches } = leagueStore;

    return (
        <> {favoriteMatches.size === 0
            ? <></>
            :
            <><Segment>
                <Header size='huge' >Favorite Teams</Header>
            </Segment>
                <Table celled inverted selectable >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width='3'>Date</Table.HeaderCell>
                            <Table.HeaderCell width='6'>Home</Table.HeaderCell>
                            <Table.HeaderCell width='6'>Away</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Array.from(favoriteMatches.values()).map((match) => (
                            <Table.Row key={match.id} >
                                <Table.Cell>{match.time}</Table.Cell>
                                <Table.Cell>{match.firstTeam}</Table.Cell>
                                <Table.Cell>{match.secondTeam}</Table.Cell>
                                <Table.Cell textAlign='center'>{match.score}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table></>}

            {leauge.matches.length === 0
                ? <></>
                : <><Segment>
                    <Header size='huge' as={Link} to={`/league/${leauge.id}`}><Image src={leauge.logo} /> {leauge.leagueName}</Header>
                </Segment>

                    <Table celled inverted selectable>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='2'>Time</Table.HeaderCell>
                                <Table.HeaderCell width='6'>First Team</Table.HeaderCell>
                                <Table.HeaderCell width='6'>Second Team</Table.HeaderCell>
                                <Table.HeaderCell textAlign='center'>Score</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {leauge.matches.map((match) => (
                                <Table.Row key={match.id}>
                                    <Table.Cell>{match.time} {isInProgress(match.time) ? <Icon style={{ marginLeft: 10 }} name='circle' color='green' /> : <Icon className='hide' style={{ marginLeft: 10 }} name='circle' color='green' />} </Table.Cell>
                                    <Table.Cell>{match.firstTeam}</Table.Cell>
                                    <Table.Cell>{match.secondTeam}</Table.Cell>
                                    <Table.Cell textAlign='center'>{match.score}</Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table></>}

        </>
    )
};


export default observer(ScheduleTable);