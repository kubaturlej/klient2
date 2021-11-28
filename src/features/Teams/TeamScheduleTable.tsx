import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

const TeamScheduleTable = () => {

    const { teamStore } = useStore();
    const { team } = teamStore;

    return (
        <>
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
                    {team?.schedule.map((match) => (
                        <Table.Row key={match.id} >
                            <Table.Cell>{match.time} {match.date} </Table.Cell>
                            <Table.Cell>{match.firstTeam}</Table.Cell>
                            <Table.Cell>{match.secondTeam}</Table.Cell>
                            <Table.Cell textAlign='center'>{match.score}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </>
    )
};
export default observer(TeamScheduleTable);