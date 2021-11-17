import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { League } from "../models/league";
import { Round } from "../models/round";
import { Team } from "../models/team";

export default class TeamStore {
    league: League | undefined = undefined;
    loadingInitial = false;

    constructor() {
        makeAutoObservable(this);
    }

    loadLeague = async (id: string) => {
        this.setLoadingInitial(true);
        try {
            const league = await agent.Leagues.getLeague(id);

            runInAction(()=>{
                this.league = league;
            })
            runInAction(()=>{
                this.league!.teams.sort(this.compareNumbers);
                this.league!.rounds.sort(this.compareRounds)
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
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

