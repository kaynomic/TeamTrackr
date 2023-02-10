const defaultState = {}

const LOAD_COMMENT = 'comments/LOAD_COMMENT';
const POST_COMMENTS = 'comments/POST_COMMENTS';
const CREATE_COMMENT = 'comments/CREATE_COMMENTS';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DELETE_COMMENT = 'comments/DELETE_COMMENT';

// GET
const loadComment = payload => {
    return {
        type: LOAD_COMMENT,
        payload
    }
}

export const loadCommentThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadComment(data))
      }
}

const loadPostComments = payload => {
    return {
        type: POST_COMMENTS,
        payload
    }
}

export const loadPostCommentsThunk = (postId) => async (dispatch) => {
    const res = await fetch(`/api/posts/${postId}/comments`)

    if (res.ok) {
        const data = await res.json()
        dispatch(loadPostComments(data))
      }
}

// POST

const createComment = payload => {
    return {
        type: CREATE_COMMENT,
        payload
    }
}

export const createCommentThunk = (postId, body) => async (dispatch) => {

    const res = await fetch(`/api/comments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postId,
          body
        }),
      });

      if (res.ok) {
        const newData = await res.json()
        dispatch(createComment(newData))
    }
}

// PUT/PATCH

const editComment = payload => {
    return {
        type: EDIT_COMMENT,
        payload
    }
}

export const editCommentThunk = (commentId, body) => async (dispatch) => {

    const res = await fetch(`/api/comments/${commentId}/edit`, {
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
        dispatch(editComment(newData))
    }
}

// DELETE

const deleteComment = (commentId) => {
    return {
        type: DELETE_COMMENT,
        commentId
    }
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const comment = await fetch(`/api/comments/${commentId}/delete`, {
        method: "DELETE"
    })

    if (comment.ok) dispatch(deleteComment(commentId))
}


export default function reducer(state = defaultState, action) {
    const newState = {...state}

    switch (action.type) {
        case LOAD_COMMENT:
            return {...newState, ...action.payload}
        case POST_COMMENTS:
            return {...newState, ...action.payload}
        case CREATE_COMMENT:
            newState[action.payload.id] = action.payload
            return newState;
        case EDIT_COMMENT:
            newState[action.payload.id] = action.payload
            return newState;
        case DELETE_COMMENT:
            delete newState[action.commentId]
            return newState;
        default:
            return state;
    }
}
