import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import { Round } from "../../app/models/round";


interface Props {
    rounds: Round[];
}

const RoundsTable = ({ rounds }: Props) => {

    return (
        <>
            {rounds.map((round) => (
                <Table key={round.id} celled inverted selectable >
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell width='3'>{round.roundNumber}</Table.HeaderCell>
                            <Table.HeaderCell width='6'>Home</Table.HeaderCell>
                            <Table.HeaderCell width='6'>Away</Table.HeaderCell>
                            <Table.HeaderCell textAlign='center'>Score</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>

                    <Table.Body>
                        {round.matches.map((match) => (
                            <Table.Row key={match.id}>
                                <Table.Cell>{match.time} {match.date} </Table.Cell>
                                <Table.Cell>{match.firstTeam}</Table.Cell>
                                <Table.Cell>{match.secondTeam}</Table.Cell>
                                <Table.Cell textAlign='center'>{match.score}</Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            ))}

        </>
    )
};
export default observer(RoundsTable);