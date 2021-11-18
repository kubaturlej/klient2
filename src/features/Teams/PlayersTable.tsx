import { observer } from "mobx-react-lite";
import { Flag, Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { countries } from "../Leagues/countries";


const PlayersTable = () => {

    const { teamStore } = useStore();
    const { team } = teamStore;

    const flagRenderer = (nat: any) => <Flag name={nat} />

    return (
        <>
            <Table celled inverted selectable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='4'>Name</Table.HeaderCell>
                        <Table.HeaderCell width='4'>Position</Table.HeaderCell>
                        <Table.HeaderCell>Matches</Table.HeaderCell>
                        <Table.HeaderCell>Goals</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Asists</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {team?.players.map((player) => (
                    <Table.Row key={player.id} >
                        <Table.Cell>{flagRenderer(countries.get(player.nationality))}{player.name}</Table.Cell>
                        <Table.Cell>{player.position}</Table.Cell>
                        <Table.Cell>{player.matchesPlayed}</Table.Cell>
                        <Table.Cell>{player.goals}</Table.Cell>
                        <Table.Cell textAlign='center'>{player.assists === '' ? 0 : player.assists}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>

        </>
    )
};
export default observer(PlayersTable);