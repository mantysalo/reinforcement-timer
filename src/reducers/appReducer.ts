import { intervals } from '../constants/intervals'

const LEVEL_CHANGED = 'LEVEL_CHANGED';
const INTERVAL_CHANGED = 'INTERVAL_CHANGED';
const TIMER_BUTTON_CLICKED = 'TIMER_BUTTON_CLICKED';

interface ChangeLevelType {
    type: typeof LEVEL_CHANGED;
    payload: 'increment' | 'decrement';
}

interface ChangeIntervalType {
    type: typeof INTERVAL_CHANGED;
    payload: 'increment' | 'decrement';
}

interface TimerButtonClickedType {
    type: typeof TIMER_BUTTON_CLICKED;
    payload: {
      timeLeft: number
    }
}

export type ActionType = ChangeLevelType | ChangeIntervalType | TimerButtonClickedType 

export interface AppState {
    level: number;
    intervalIndex: number;
    isTimerTicking: boolean;
}

export const appReducer = (state: AppState, action: ActionType): AppState => {
    switch (action.type) {
        case LEVEL_CHANGED:
            if (action.payload === 'increment' && state.level < Object.keys(intervals).length) {
                return {
                    intervalIndex: 0,
                    level: state.level + 1,
                    isTimerTicking: false,
                };
            } else if (action.payload === 'decrement' && state.level > 1) {
                return {
                    intervalIndex: 0,
                    level: state.level - 1,
                    isTimerTicking: false
                };
            }
            return { ...state };
        case INTERVAL_CHANGED:
            if (action.payload === 'increment' && state.intervalIndex < intervals[state.level].length - 1) {
                return {
                    ...state,
                    intervalIndex: state.intervalIndex + 1,
                    isTimerTicking: false
                };
            } else if (action.payload === 'decrement' && state.intervalIndex > 0) {
                return {
                    ...state,
                    intervalIndex: state.intervalIndex - 1,
                    isTimerTicking: false
                };
            }
            return { ...state };
        case TIMER_BUTTON_CLICKED:
            if (state.intervalIndex === intervals[state.level].length - 1 && action.payload.timeLeft === 0) {
                return { ...state, isTimerTicking: false, intervalIndex: 0 };
            }
            if (state.isTimerTicking) {
                return { ...state, isTimerTicking: false };
            } else if (state.isTimerTicking === false) {
                return { ...state, isTimerTicking: true };
            }
            return { ...state };
    }
};