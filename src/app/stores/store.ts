import { createContext, useContext } from "react";
import LeagueStore from "./leagueStore";
import ModalStore from "./modalStore";
import SerwerItemsStore from "./serwerItemsStore";
import TeamStore from "./teamStore";
import UserStore from "./userStore";

interface Store {
    leagueStore: LeagueStore,
    teamStore: TeamStore,
    userStore: UserStore,
    serwerItemsStore: SerwerItemsStore,
    modalStore: ModalStore
}

export const store: Store = {
    leagueStore: new LeagueStore(),
    teamStore: new TeamStore(),
    userStore: new UserStore(),
    serwerItemsStore: new SerwerItemsStore(),
    modalStore: new ModalStore()
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}