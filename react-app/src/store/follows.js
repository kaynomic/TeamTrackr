const defaultState = {}

const FOLLOWERS = 'follows/LOAD_FOLLOWERS';
const FOLLOWING = 'follows/LOAD_FOLLOWING'
const FOLLOW_USER = 'follows/FOLLOW_USER';
const UNFOLLOW_USER = 'follows/UNFOLLOW_USER'

const followers = payload => {
    return {
        type: FOLLOWERS,
        payload
    }
}

export const followersThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/followers`)

    if (res.ok) {
        const data = await res.json()
        dispatch(followers(data))
      }
}

const following = payload => {
    return {
        type: FOLLOWING,
        payload
    }
}

export const followingThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/following`)

    if (res.ok) {
        const data = await res.json()
        dispatch(following(data))
      }
}

const followUser = payload => {
    return {
        type: FOLLOW_USER,
        payload
    }
}

export const followUserThunk = (targetId) => async (dispatch) => {

    const res = await fetch(`/api/users/follow/${targetId}`)

      if (res.ok) {
        const newData = await res.json()
        dispatch(followUser(newData))
    }
}

const unfollowUser = (payload) => {
    return {
        type: UNFOLLOW_USER,
        payload
    }
}

export const unfollowUserThunk = (targetId) => async (dispatch) => {
    const unfollow = await fetch(`/api/users/unfollow/${targetId}`, {
        method: "DELETE"
    })

    if (unfollow.ok) dispatch(unfollowUser(targetId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case FOLLOWERS:
            return {...state, followers: action.payload}
        case FOLLOWING:
            return {...state, following: action.payload}
        case FOLLOW_USER:
            return {...newState}
        case UNFOLLOW_USER:
            return {...newState}
        default:
            return state;
    }
}