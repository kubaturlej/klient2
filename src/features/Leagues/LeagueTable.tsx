import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Table, Image, Header } from "semantic-ui-react";
import { Team } from "../../app/models/team";

interface Props {
    teams: Team[];
}

const LeagueTable = ({ teams }: Props) => {

    return (
        <>
            <Table celled inverted selectable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='2'>Position</Table.HeaderCell>
                        <Table.HeaderCell width='8'>Team Name</Table.HeaderCell>
                        <Table.HeaderCell>Points</Table.HeaderCell>
                        <Table.HeaderCell>Matches</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Goals</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                {teams.map((team) => (
                    <Table.Row key={team.id} >
                        <Table.Cell>{team.standing}</Table.Cell>
                        <Table.Cell><Header size='tiny' as={Link} to={`/team/${team.id}`}><Image src={team.logo} avatar/>{team.teamName}</Header></Table.Cell>
                        <Table.Cell>{team.points}</Table.Cell>
                        <Table.Cell>{team.matches}</Table.Cell>
                        <Table.Cell textAlign='center'>{team.goalBalance}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>

        </>
    )
};
export default observer(LeagueTable);