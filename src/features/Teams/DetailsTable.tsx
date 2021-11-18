import { observer } from "mobx-react-lite";
import { Table } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";



const DetailsTable = () => {

    const { teamStore } = useStore();
    const { team } = teamStore;

    return (
        <>
            <Table celled inverted selectable >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell width='4'>Stats</Table.HeaderCell>
                        <Table.HeaderCell width='4'>Overall</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <Table.Row >
                        <Table.Cell>Matches played</Table.Cell>
                        <Table.Cell>{team?.matches}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Win ratio</Table.Cell>
                        <Table.Cell>{Math.floor((parseInt(team!.wins)/parseInt(team!.matches))*100)}%</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Goals scored per match</Table.Cell>
                        <Table.Cell>{team?.goalsScoredPerMatch}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Goals conceded per match</Table.Cell>
                        <Table.Cell>{team?.goalsConcededPerMacth}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Goals scored</Table.Cell>
                        <Table.Cell>{team?.goalScored}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Goals conceded</Table.Cell>
                        <Table.Cell>{team?.goalConceded}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Clean sheets</Table.Cell>
                        <Table.Cell>{team?.cleanSheets}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Avarge posession</Table.Cell>
                        <Table.Cell>{team?.avgPossession}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>Avarge golas per match</Table.Cell>
                        <Table.Cell>{team?.avgGoalsPerMacth}</Table.Cell>
                    </Table.Row>
                    <Table.Row >
                        <Table.Cell>League standing</Table.Cell>
                        <Table.Cell>{team?.standing}</Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>

        </>
    )
};
export default observer(DetailsTable);