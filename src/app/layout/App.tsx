import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ScheduleMainPage from '../../features/Schedule/ScheduleMainPage';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';
import { Route, Switch } from 'react-router';
import HomePage from '../../features/Home/HomePage';
import LeagueMainPage from '../../features/Leagues/LeagueMainPage';
import TestErrors from '../../features/errors/TestError';
import NotFound from '../../features/errors/NotFound';
import LoginForm from '../../features/Users/LoginForm';
import LoginModal from '../../features/Users/LoginModal';
import RegisterModal from '../../features/Users/RegisterModal';
import TeamMainPage from '../../features/Teams/TeamMainPage';
import SearchTeamComponent from '../../features/Teams/SearchTeamComponent';
import ServerError from '../../features/errors/ServerError';
import UserProfile from '../../features/Users/UserProfile';

function App() {

  const {  serwerItemsStore, userStore } = useStore();

  useEffect(() => {
    if (serwerItemsStore.JWT) {
      userStore.getUserAfterAppReload();
    }
  }, [serwerItemsStore.JWT, userStore])

  return (
    <>
      <LoginModal />
      <RegisterModal />
      <Route exact path='/' component={HomePage} />
      <Route
        path={'/(.+)'}
        render={() => (
          <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route path='/league/:id' component={LeagueMainPage} />
                <Route path='/team/:id' component={TeamMainPage} />
                <Route exact path='/dashboard' component={ScheduleMainPage} />
                <Route path='/searchTeam' component={SearchTeamComponent} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/login' component={LoginForm} />
                <Route path='/profile' component={UserProfile} />
                <Route component={NotFound} />
                <Route component={ServerError} />
              </Switch>
            </Container>
          </>
        )}
      />
    </>
  );
}

export default observer(App);
