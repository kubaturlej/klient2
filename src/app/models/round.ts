import { Match } from "./match";

export interface Round {
    id:               number;
    roundNumber:      string;
    matches:          Match[];
}