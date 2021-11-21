import axios, { AxiosError, AxiosResponse } from 'axios'
import { League } from '../models/league'
import { Player } from '../models/player'
import { Round } from '../models/round'
import { Team } from '../models/team'
import { history } from '../..';
import { User, UserLoginFormValues, UserRegisterFormValues } from '../models/user'
import { store } from '../stores/store'

axios.defaults.baseURL = 'http://localhost:5000';

axios.interceptors.request.use(config => {
    const token = store.serwerItemsStore.JWT;
    if (token)  config.headers!.Authorization = `Bearer ${token}`;
    return config;
})

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

const getResponseData = <T>(response: AxiosResponse<T>) => response.data

axios.interceptors.response.use(async response => {
    await sleep(300);
    if (response.status === 204) {
        store.teamStore.notFoundResult = 'Not found anything !';
    }
    else {
        store.teamStore.notFoundResult = '';
    }
    return response;
}, (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
        case 400:
            const errors = [];
            if (data.errors) {
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        errors.push(data.errors[key])
                    }
                }
            }
            store.modalStore.setErrors(errors);
            console.log(data.errors);
            break;
        case 401:
            history.push('/');
            break;
        case 404:
            history.push('/notfound');
            break;
        case 500:
            console.log('500');
            break;

        default:
            break;
    }

    return Promise.reject(error);
})

const requests = {
    get: <T>(url: string) => axios.get<T>(url).then(getResponseData),
    getWithDate: <T>(url: string, date: string) => axios.get<T>(url, {
        headers: {
            'dateTime': date
        }
    }).then(getResponseData),
    getTeamByName: <T>(url: string, name: string) => axios.get<T>(url, {
        headers: {
            'teamName': name
        }
    }).then(getResponseData),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(getResponseData),
}

const Leagues = {
    getLeagues: () => requests.get<League[]>('/api/Leagues'),
    getMatchesForToday: (date: string) => requests.getWithDate<League[]>(`/api/Leagues/schedule/date`, date),
    getLeague: (id: string) => requests.get<League>(`/api/Leagues/${id}`),
    getSchedule: (leagueId: string) => requests.get<Round[]>(`/api/Leagues/${leagueId}/schedule`)
}

const Players = {
    getPlayersForLeague: (leagueId: string) => requests.get<Player[]>(`/api/Players/${leagueId}/league`),
    getBestScorersForLeague: (leagueId: string) => requests.get<Player[]>(`/api/Players/${leagueId}/scorers`),
    getPlayersForTeam: (teamId: string) => requests.get<Player[]>(`/api/Players/${teamId}/team`),
    getPlayer: (id: string) => requests.get<Player>(`/api/Players/${id}`)
}

const Teams = {
    getTeamsForLeague: (leagueId: string) => requests.get<Team[]>(`/api/Teams/${leagueId}/league`),
    getTeam: (id: string) => requests.get<Team>(`/api/Teams/${id}`),
    getTeamByName: (name: string) => requests.getTeamByName<Team[]>(`/api/Teams`, name),
}

const Users = {
    login: (user: UserLoginFormValues) => requests.post<User>('/api/User/login', user),
    register: (user: UserRegisterFormValues) => requests.post<User>('/api/User/register', user),
    getUserAfterReload: () => requests.get<User>('/api/User')
}

const agent = {
    Leagues,
    Players,
    Teams,
    Users
}


export default agent;