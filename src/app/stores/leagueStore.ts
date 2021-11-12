import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { League } from "../models/league";
import { Team } from "../models/team";

export default class LeagueStore {
    leagues: League[] = [];
    loading = false;
    loadingInitial = false;
    currentDate: Date | null  = null;
    currentDateAsString: string = new Date().toLocaleDateString('en-GB');

    constructor() {
        makeAutoObservable(this);
    }

    loadLeagues = async () => {
        this.setLoadingInitial(true);
        runInAction(()=> {
            this.leagues = [];
        })
        try {
            const leagues = await agent.Leagues.getLeagues();

            leagues.forEach(league => {
                this.addLeague(league);
            })
            runInAction(()=> {
               this.currentDate = new Date();
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadLeaguesForSpecificDate = async (daysToAdd: number) => {
        this.setLoadingInitial(true);
        this.changeDate(daysToAdd);
        runInAction(()=> {
            this.leagues = [];
        })
        try {
            const leagues = await agent.Leagues.getMatchesForToday(this.currentDateAsString);
            leagues.forEach(league => {
                this.addLeague(league);
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    private addLeague = (league: League) => {
        this.leagues.push(league);
    }

    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }

    compareNumbers = (a: Team, b: Team) => {
        return parseInt(a.standing) - parseInt(b.standing);
    }

    changeDate = (dayToAdd: number) => {
        this.currentDate!.setDate(this.currentDate!.getDate() + dayToAdd); 

        const dd = this.currentDate!.getDate();
        const mm = this.currentDate!.getMonth() + 1;
        const y = this.currentDate!.getFullYear();

        const formattedDate = dd + '/' + mm + '/' + y;

        this.currentDateAsString = formattedDate;
    }

}

