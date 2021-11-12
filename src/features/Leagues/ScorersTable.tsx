import { Flag, Table } from "semantic-ui-react";
import { Player } from "../../app/models/player";

interface Props {
    player: Player[];
}

const ScorersTable = ({ player }: Props) => {

    const countries = new Map([
        ["FRA", "france"],
        ["REU", "france"],
        ["BRA", "brazil"],
        ["ENG", "england"],
        ["POR", "portugal"],
        ["EGY", "egypt"],
        ["KOR", "south korea"],
        ["GER", "germany"],
        ["ITA", "italy"],
        ["POL", "poland"],
        ["SWE", "sweden"],
        ["NOR", "norway"],
        ["CRO", "croatia"],
        ["ESP", "spain"],
        ["URU", "uruguay"],
        ["SEN", "senegal"],
        ["JAM", "jamaica"],
        ["GAB", "gabon"],
        ["ARG", "argentina"],
        ["COL", "colombia"],
        ["NED", "netherlands"],
        ["CZE", "czech republic"],
        ["HUN", "hungary"],
        ["NGA", "nigeria"],
        ["BIH", "bosnia"],
        ["SRB", "serbia"],
        ["HON", "honduras"],
        ["SVK", "slovakia"],
        ["CAN", "canada"],
        ["TUN", "tunisia"],
        ["GUI", "guinea"],
        ["GHA", "ghana"],
    ]);
 


    const flagRenderer = (nat: any) => <Flag name={nat} />
    return (
       <>
            <Table celled inverted selectable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='1'>#</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center' width='1'>Nationality</Table.HeaderCell>
                        <Table.HeaderCell width='4'>Player</Table.HeaderCell>
                        <Table.HeaderCell width='2'>Goals</Table.HeaderCell>
                        <Table.HeaderCell width='2'>Played</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>

                <Table.Body>
                {player.map((player, i) => (
                    <Table.Row key={player.id}>
                        <Table.Cell>{i+1}</Table.Cell>
                        <Table.Cell textAlign='center'>{flagRenderer(countries.get(player.nationality))}</Table.Cell>
                        <Table.Cell>{player.name}</Table.Cell>
                        <Table.Cell>{player.goals}</Table.Cell>
                        <Table.Cell>{player.matchesPlayed}</Table.Cell>
                    </Table.Row>
                ))}
                </Table.Body>
            </Table>
       </>
    )
}

export default ScorersTable