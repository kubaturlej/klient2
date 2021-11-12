import { observer } from 'mobx-react-lite';
import { Icon, Menu, Tab } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store';
import LeagueTable from './LeagueTable'
import RoundsTable from './RoundsTable';
import ScorersTable from './ScorersTable';


const LeagueTabs = () => {
    const { teamStore } = useStore();
    const { league } = teamStore;

    const panes = [
        {
            menuItem: (
                <Menu.Item key='table'>
                    Table<Icon name='table' />
                </Menu.Item>
            ), render: () => <Tab.Pane content={<LeagueTable teams={league!.teams} />}></Tab.Pane>
        },
        {
            menuItem: (
                <Menu.Item key='schedule'>
                    Schedule<Icon name='sticky note' />
                </Menu.Item>
            ), render: () => <Tab.Pane content={<RoundsTable rounds={league!.rounds}/>}></Tab.Pane>
        },
        {
            menuItem: (
                <Menu.Item key='scorers'>
                    Scorers<Icon name='user' />
                </Menu.Item>
            ), render: () => <Tab.Pane content={<ScorersTable player={league!.scorers} />}></Tab.Pane>
        },
    ]
    return (
        <Tab menu={{ fluid: true, vertical: true, }} grid={{ paneWidth: 12, tabWidth: 4 }} panes={panes} />
    )
}

export default observer(LeagueTabs)