import { observer } from "mobx-react-lite";
import { Header, Segment, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const FavoriteTable = () => {

    const { leagueStore } = useStore();
    const { favoriteMatches } = leagueStore;

    return (
        <>
            {favoriteMatches.size === 0
                ? <></>
                :
                <><Segment>
                    <Header size='huge' >Favorite Teams</Header>
                </Segment>
                    <Table celled inverted selectable >
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell width='2'>Date</Table.HeaderCell>
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
        </>
    )
};


export default observer(FavoriteTable);

