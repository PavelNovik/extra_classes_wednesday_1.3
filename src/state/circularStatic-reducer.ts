export type CircularReducerType = ChangeProgressACType | ChangeIsWaitingDoneACType

export type  CircularStaticStateType = {
    [key: string]: {
        progress: number
        isWaitingDone: boolean
    }
}
const initialState: CircularStaticStateType = {}

export const circularStaticReducer = (state = initialState, action: CircularReducerType): CircularStaticStateType => {
    switch (action.type) {
        case 'CHANGE_PROGRESS': {
            return {...state, [action.id]: {...state[action.id], progress: action.progress}}
        }
        case 'CHANGE_ISWAITINGDONE': {
            return {...state, [action.id]: {...state[action.id], isWaitingDone: action.isWaitingDone}}
        }
        default:
            return state
    }
}

type ChangeProgressACType = ReturnType<typeof changeProgressAC>
export const changeProgressAC = (id:string,progress: number) => {
    return {
        type: 'CHANGE_PROGRESS',
        id,
        progress
    } as const
}

type ChangeIsWaitingDoneACType = ReturnType<typeof changeIsWaitingDoneAC>
export const changeIsWaitingDoneAC = (id:string,isWaitingDone: boolean) => {
    return {
        type: 'CHANGE_ISWAITINGDONE',
        id,
        isWaitingDone
    } as const
}