import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";
import { User, UserLoginFormValues, UserRegisterFormValues } from "../models/user";
import { store } from "./store";
import { history } from '../..';

export default class UserStore {
    user: User | null = null;
    constructor() {
        makeAutoObservable(this);
    }

    get isUserLoggedIn() {
        return !!this.user;
    }

    login = async (pass: UserLoginFormValues) => {
        try {
            const user = await agent.Users.login(pass);
            store.serwerItemsStore.setJWT(user.token);
            runInAction(() => {
                this.user = user;
            })
            store.modalStore.isOpen = false;
            history.push('/dashboard');
        } catch (error) {
            throw error;
        }
    }

    logout = async () => {
        store.serwerItemsStore.setJWT(null);
        window.localStorage.removeItem('jwt');
        this.user = null;
        history.push('/');
    }

    getUserAfterAppReload = async () => {
        try {
            const user = await agent.Users.getUserAfterReload();
            runInAction(() => {
                this.user = user;
            })
        } catch (error) {
            console.log(error);
        }
    }

    register = async (userData: UserRegisterFormValues) => {
        try {
            const user = await agent.Users.register(userData);
            store.serwerItemsStore.setJWT(user.token);
            runInAction(() => {
                this.user = user;
            })
            store.modalStore.isOpen = false;
            history.push('/dashboard');
        } catch (error) {
            throw error;
        }
    }
}

