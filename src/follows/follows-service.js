import axios from "axios";
import {findUserById} from "../users/users-service";
const FOLLOWS_API = 'http://localhost:4000/follows'
const USERS_API = 'http://localhost:4000/users'

const api = axios.create({withCredentials: true});

export const followUser = async (follow) => {
    const response = await api.post(`${FOLLOWS_API}`, follow)
    response.data.followed = await findUserById(response.data.followed)
    response.data.follower = await findUserById(response.data.follower)
    return response.data
}

export const findFollowers = async (followed) => {
    const response = await api.get(`${USERS_API}/${followed}/followers`)
    return response.data
}

export const findFollowing = async (follower) => {
    const response = await api.get(`${USERS_API}/${follower}/following`)
    return response.data
}

