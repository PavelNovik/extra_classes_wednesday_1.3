export type IsLoadingStateType = {
    isLoading: boolean
}

const initialState: IsLoadingStateType = {
    isLoading: false
}

export const isLoadingReducer = (state = initialState, action: IsLoadingACType): IsLoadingStateType => {
    switch (action.type) {
        case 'IS-LOADING':

            return { ...state, isLoading: action.isLoading };

        default:
            return state;
    }
}

export type IsLoadingACType = ReturnType<typeof isLoadingAC>

export const isLoadingAC = (isLoading: boolean) => {
    return {
        type: 'IS-LOADING',
        isLoading
    } as const
}