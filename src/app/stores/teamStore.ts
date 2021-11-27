import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { League } from "../models/league";
import { Round } from "../models/round";
import { Team } from "../models/team";

export default class TeamStore {
    league: League | undefined = undefined;
    team: Team | undefined = undefined;
    leagues: League[] = [];
    teams: Team[] = [];
    searchResults: Team[] = [];
    favoritesTeams: Team[] = [];
    loading = false;
    loadingInitial = false;
    notFoundResult: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    loadLeague = async (id: string) => {
        const found = this.leagues.find(x => x.id === parseInt(id));
        if (found) {
            runInAction(()=>{
                this.league = found;
                this.league!.teams.sort(this.compareNumbers);
                this.league!.rounds.sort(this.compareRounds);
            })
        } else {
            this.setLoadingInitial(true);
            try {
                const league = await agent.Leagues.getLeague(id);

                runInAction(()=>{
                    this.league = league;
                    this.league!.teams.sort(this.compareNumbers);
                    this.league!.rounds.sort(this.compareRounds);
                })

                this.leagues.push(league);
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadTeam = async (id: string) => {
        const found = this.teams.find(x => x.id === parseInt(id));
        if (found) {
            runInAction(()=>{
                this.team = found;
            })
        } else {
            this.setLoadingInitial(true);
            try {
                const team = await agent.Teams.getTeam(id);
                this.teams.push(team);

                runInAction(()=>{
                    this.team = team;
                })

                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }

    loadSearchResults = async (name: string) => {
        this.setLoadingInitial(true);
        this.searchResults = [];
        try {
            const teams = await agent.Teams.getTeamByName(name);

            teams.forEach( team => {
                this.searchResults.push(team);
            })

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadFavoriteTeams =  async () => {
        this.setLoadingInitial(true);
        try {
            const teams = await agent.Teams.getFavoriteTeams();

            teams.forEach( team => {
                this.favoritesTeams.push(team);
            })

            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    HandleFavoritesTeams = async (teamId: string) => {
        this.setLoading(true);
        try {
            await agent.Teams.handleFavoriteTeam(teamId);
            runInAction(()=>{
                const found = this.teams.find(x => x.id === parseInt(teamId));
                const favoriteFound = this.favoritesTeams.find(x => x.id === parseInt(teamId));
                if (favoriteFound) {
                    this.favoritesTeams = [...this.favoritesTeams.filter(t => t.id !== parseInt(teamId))];
                }
                else {
                    this.favoritesTeams.push(found!);
                }
            })
            this.setLoading(false);
            console.log(this.favoritesTeams);
            
        } catch (error) {
            console.log(error);
            this.setLoading(false);
        }
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    setLoading = (state: boolean) => {
        this.loading = state;
    }

    private compareNumbers = (a: Team, b: Team) => {
        return parseInt(a.standing) - parseInt(b.standing);
    }

    private compareRounds = (a: Round, b: Round) => {
        return parseInt(a.roundNumber.split('.')[0]) - parseInt(b.roundNumber.split('.')[0]);
    }
    
}

