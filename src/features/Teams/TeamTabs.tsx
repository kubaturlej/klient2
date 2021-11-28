import React from 'react'
import { Tab } from 'semantic-ui-react'
import DetailsTable from './DetailsTable';
import PlayersTable from './PlayersTable';
import TeamScheduleTable from './TeamScheduleTable';

const panes = [
  { menuItem: 'Details', render: () => <Tab.Pane><DetailsTable/></Tab.Pane> },
  { menuItem: 'Players', render: () => <Tab.Pane><PlayersTable/></Tab.Pane> },
  { menuItem: 'Matches', render: () => <Tab.Pane><TeamScheduleTable/></Tab.Pane> },
]

const TeamTabs = () => <Tab  menu={{ color:'red', inverted: true, attached: false, tabular: false }} panes={panes} />

export default TeamTabs;