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
    loadingInitial = false;

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

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    private compareNumbers = (a: Team, b: Team) => {
        return parseInt(a.standing) - parseInt(b.standing);
    }

    private compareRounds = (a: Round, b: Round) => {
        return parseInt(a.roundNumber.split('.')[0]) - parseInt(b.roundNumber.split('.')[0]);
    }
    
}

