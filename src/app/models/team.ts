import { Match } from "./match";
import { Player } from "./player";

export interface Team {
    id:                    number;
    teamName:              string;
    teamNationality:       string;
    goalsScoredPerMatch:   string;
    goalsConcededPerMacth: string;
    avgPossession:         string;
    standing:              string;
    matches:               string;
    points:                string;
    wins:                  string;
    draws:                 string;
    losses:                string;
    goalBalance:           string;
    goalScored:            string;
    goalConceded:          string;
    macthesHistory:        string;
    cleanSheets:           string;
    avgGoalsPerMacth:      string;
    logo:                  string;
    isFollowed:            boolean;
    players:               Player[];
    schedule:              Match[];
}
