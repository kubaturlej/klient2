import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Container, Dropdown, DropdownItem, Flag, Icon, Menu, MenuItem } from "semantic-ui-react"
import { useStore } from "../stores/store";

const NavBar = () => {
    const { userStore, leagueStore, teamStore } = useStore();
    const { leagues } = leagueStore;

    useEffect(() => {
        leagueStore.loadLeagues();
        teamStore.loadFavoriteTeams();
    }, [leagueStore, teamStore]);

    const countries = [
        { name: 'england' },
        { name: 'germany' },
        { name: 'italy' },
        { name: 'spain' },
        { name: 'france' },
        { name: 'poland' },
    ]
    const flagRenderer = (item: any) => <Flag name={item.name} />

    return (
        <Menu inverted fixed='top'>
            <Container>
                <MenuItem header as={Link} to='/' >
                    <Icon name='futbol' size='big' />
                </MenuItem>
                <MenuItem as={NavLink} to='/dashboard' name='Football is amazing !' />
                <Dropdown item text='Leagues'>
                    <Dropdown.Menu>
                        {leagues.map(league => (
                            <Dropdown.Item as={NavLink} to={`/league/${league.id}`} key={league.id}> {flagRenderer(countries[leagues.findIndex(l => l.id === league.id)])}{league.leagueName}</Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                </Dropdown>
                <MenuItem as={NavLink} to='/searchTeam'  >Search team <Icon style={{marginLeft: 10}} name='search'/></MenuItem>
                <MenuItem position='right'>
                    <Dropdown item text={userStore.user?.nickName} icon='chevron down'>
                        <Dropdown.Menu >
                            <DropdownItem as={NavLink} to='/profile' text='Profile' icon='user circle' />
                            <DropdownItem onClick={userStore.logout} text='Logout' icon='sign-out' />
                        </Dropdown.Menu>
                    </Dropdown>
                </MenuItem>
            </Container>
        </Menu>
    )
};


export default observer(NavBar);