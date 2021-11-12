import React from 'react'
import { Progress } from 'semantic-ui-react'

interface Props {
    leagueProgress: string
}

const LeagueProgessBar = ({leagueProgress}: Props) => <Progress percent={parseInt(leagueProgress.replace('%',''))} progress />

export default LeagueProgessBar