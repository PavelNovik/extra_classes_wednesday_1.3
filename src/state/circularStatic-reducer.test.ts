import {
    changeIsWaitingDoneAC,
    changeProgressAC,
    circularStaticReducer,
    CircularStaticStateType
} from "./circularStatic-reducer";
import {addTodolistAC} from "./todolists-reducer";

let startState: CircularStaticStateType

beforeEach(() => {
    startState = {}
})

test('CircularStatic object should be created', () => {
    const action = addTodolistAC('test')
    const endState = circularStaticReducer(startState, action)

    expect(endState[action.todolistId].progress).toBe(0)
    expect(endState[action.todolistId].isWaitingDone).toBeTruthy()
    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe(action.todolistId)
    expect(Object.keys(endState[action.todolistId]).length).toBe(2)
    expect(Object.keys(endState[action.todolistId])[0]).toBe('progress')
    expect(Object.keys(endState[action.todolistId])[1]).toBe('isWaitingDone')
})

test('Progress should be changed', () => {
    const action = addTodolistAC('test')
    const state = circularStaticReducer(startState, action)
    const nextAction = changeProgressAC(action.todolistId, 33)

    const endState = circularStaticReducer(state,nextAction)

    expect(endState[action.todolistId].progress).toBe(33)
    expect(state[action.todolistId].progress).toBe(0)
    expect(state[action.todolistId].isWaitingDone).toBeTruthy()
})

test('Is Waiting Done should be changed', () => {
    const action = addTodolistAC('test')
    const state = circularStaticReducer(startState, action)
    const nextAction = changeIsWaitingDoneAC(action.todolistId, false)

    const endState = circularStaticReducer(state,nextAction)

    expect(endState[action.todolistId].isWaitingDone).toBeFalsy()
    expect(state[action.todolistId].progress).toBe(0)
    expect(state[action.todolistId].isWaitingDone).toBeTruthy()
})