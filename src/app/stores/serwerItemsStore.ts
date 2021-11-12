import { makeAutoObservable, reaction } from "mobx";

export default class SerwerItemsStore {
    JWT: string | null =  window.localStorage.getItem('jwt');

    constructor() {
        makeAutoObservable(this);

        reaction(() => this.JWT, JWT => {
            if (JWT) {
                window.localStorage.setItem('jwt', JWT);
            } else {
                window.localStorage.removeItem('jwt');
            }
        })
    }

    setJWT = (JWT: string | null) => {
        this.JWT = JWT;
    }

}