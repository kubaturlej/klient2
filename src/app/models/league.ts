import { Match } from "./match";
import { Player } from "./player";
import { Round } from "./round";
import { Team } from "./team";

export interface League {
    id:               number;
    leagueName:       string;
    totalMatches:     string;
    matchesCompleted: string;
    leagueProgress:   string;
    logo:             string;
    nationality:      string;
    matches:          Match[];
    scorers:          Player[];
    rounds:           Round[];
    teams:            Team[];
}
