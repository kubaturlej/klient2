import { makeAutoObservable, runInAction } from "mobx"
import agent from "../api/agent";
import { League } from "../models/league";
import { Match } from "../models/match";
import { Team } from "../models/team";
import { store } from "./store";


interface Body {
    name: string;
    date: string;
}
export default class LeagueStore {
    leagues: League[] = [];
    loading = false;
    loadingInitial = false;
    currentDate: Date | null = null;
    currentDateAsString: string = new Date().toLocaleDateString('en-GB');
    favoriteMatches = new Map<string, Match>();


    constructor() {
        makeAutoObservable(this);
    }

    loadLeagues = async () => {
        this.setLoadingInitial(true);
        runInAction(() => {
            this.leagues = [];
        })
        try {
            const leagues = await agent.Leagues.getLeagues();

            leagues.forEach(league => {
                this.addLeague(league);
            })
            runInAction(() => {
                this.currentDate = new Date();
            })
            this.setLoadingInitial(false);
        } catch (error) {
            console.log(error);
            this.setLoadingInitial(false);
        }
    }

    loadFavMatches = async () => {
        runInAction(() => {
            this.favoriteMatches = new Map<string, Match>();
        })
        store.teamStore.favoritesTeams.forEach(async (team) => {
            const body: Body = {name: team.teamName, date: this.currentDateAsString};
            const result = await agent.Teams.getMatchForSpecificDayAndTeam(body);

            runInAction(() => {
                if (result.length === 1) {
                    this.favoriteMatches.set(team.teamName, result[0])
                }
            })
        }
        )
    }

    loadLeaguesForSpecificDate = async (daysToAdd: number) => {
        this.setLoadingInitial(true);
        this.changeDate(daysToAdd);
        runInAction(() => {
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

