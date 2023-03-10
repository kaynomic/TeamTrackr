const defaultState = {}

const LOAD_POST = 'posts/LOAD_POST';
const USER_POSTS = 'posts/USER_POSTS';
const ALL_POSTS = 'posts/ALL_POSTS';
const CREATE_POST = 'posts/CREATE_POST';
const EDIT_POST = 'posts/EDIT_POST';
const DELETE_POST = 'posts/DELETE_POST';


const loadPost = payload => {
    return {
        type: LOAD_POST,
        payload
    }
}

export const loadPostThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPost(data))
      }
}

const loadUserPosts = payload => {
    return {
        type: USER_POSTS,
        payload
    }
}

export const loadUserPostsThunk = (userId) => async (dispatch) => {
    const res = await fetch(`/api/users/${userId}/posts`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadUserPosts(data))
      }
}

const allPosts = payload => {
    return {
        type: ALL_POSTS,
        payload
    }
}

export const allPostsThunk = () => async (dispatch) => {
    const res = await fetch(`/api/posts`)

    if (res.ok) {
        const data = await res.json()
        dispatch(allPosts(data))
      }
}

const createPost = payload => {
    return {
        type: CREATE_POST,
        payload
    }
}

export const createPostThunk = (body) => async (dispatch) => {

    const res = await fetch(`/api/posts/create`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({
          body
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(createPost(newData))
    }
}

const editPost = payload => {
    return {
        type: EDIT_POST,
        payload
    }
}

export const editPostThunk = (postId, body) => async (dispatch) => {

    const res = await fetch(`/api/posts/${postId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          body
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(editPost(newData))
    }
}

const deletePost = (postId) => {
    return {
        type: DELETE_POST,
        postId
    }
}

export const deletePostThunk = (postId) => async (dispatch) => {
    const post = await fetch(`/api/posts/${postId}/delete`, {
        method: "DELETE"
    })

    if (post.ok) dispatch(deletePost(postId))
}

export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_POST:
            return {...action.payload}
        case USER_POSTS:
            return {...action.payload}
        case ALL_POSTS:
            return {...action.payload}
        case CREATE_POST:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_POST:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_POST:
            delete newState[action.postId]
            return newState;
        default:
            return state;
    }
}