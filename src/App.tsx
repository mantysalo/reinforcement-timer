import React, { useState, useEffect, useCallback, useReducer } from 'react';
import styled from 'styled-components';
import { intervals } from './constants/intervals';
import { useInterval } from './hooks/useInterval';
import Fab from '@material-ui/core/Fab';
import { PlayArrow, Pause, Replay, KeyboardArrowLeft, KeyboardArrowRight } from '@material-ui/icons';
import { DotsStepper } from './Stepper';
import { AppState, appReducer } from './reducers/appReducer';
import { IconButton } from '@material-ui/core';

const FlexCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const LevelIndicator = styled.h1`
    margin-top: 0;
`;

const AppHeader = styled.header`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-grow: 2;
`;

const Counter = styled.p`
    font-size: 10rem;
    font-weight: 700;
    margin: 0;
`;

const Progress = styled.p`
    font-size: 1rem;
    font-weight: 400;
    margin: 0;
    text-align: center;
`;

const StepperContainer = styled.nav`
display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  @media only screen and (max-width : 480px) {
    width: 100%;
  }
`;

const initialState: AppState = {
    level: 1,
    intervalIndex: 0,
    isTimerTicking: false,
};

const renderIcon = (start: boolean, level: number, intervalIndex: number, timeLeft: number) => {
    if (intervalIndex === intervals[level].length - 1 && timeLeft === 0) {
        return <Replay />;
    } else if (start) {
        return <Pause />;
    }
    return <PlayArrow />;
};

const App = () => {
    const [state, dispatch] = useReducer(appReducer, initialState);
    const [timeLeft, setTimeLeft] = useState(intervals[state.level][0]);

    useEffect(() => setTimeLeft(intervals[state.level][state.intervalIndex]), [state.level, state.intervalIndex]);

    const keyboardShortCutHandler = useCallback(e => {
        if (e.code === 'Space') dispatch({ type: 'TIMER_BUTTON_CLICKED', payload: {timeLeft} });
        else if (e.code === 'ArrowDown') dispatch({ type: 'LEVEL_CHANGED', payload: 'decrement' });
        else if (e.code === 'ArrowUp') dispatch({ type: 'LEVEL_CHANGED', payload: 'increment' });
        else if (e.code === 'ArrowRight') dispatch({ type: 'INTERVAL_CHANGED', payload: 'increment' });
        else if (e.code === 'ArrowLeft') dispatch({ type: 'INTERVAL_CHANGED', payload: 'decrement' });
    }, [timeLeft]);

    useEffect(() => {
        document.addEventListener('keydown', keyboardShortCutHandler);
        return () => document.removeEventListener('keydown', keyboardShortCutHandler);
    });

    useInterval(() => {
      if (timeLeft > 0) {
          setTimeLeft(time => time - 1);
      }
      if (timeLeft === 0) {
        dispatch({type: 'INTERVAL_CHANGED', payload: 'increment'})
      }
  }, state.isTimerTicking ? 1000 : null);
    return (
        <FlexCenter>
            <AppHeader>
              <IconButton disabled={state.intervalIndex === 0} onClick={() => dispatch({type: 'INTERVAL_CHANGED', payload: 'decrement'})}>
                <KeyboardArrowLeft/>
              </IconButton>
              <div style={{flex: 1}}>
                <Counter aria-live={state.isTimerTicking ? 'polite' : 'off'}>{timeLeft}</Counter>
                <Progress>
                    {state.intervalIndex + 1} / {intervals[state.level].length}
                </Progress>
                </div>
                <IconButton disabled={state.intervalIndex === intervals[state.level].length - 1} onClick={() => dispatch({type: 'INTERVAL_CHANGED', payload: 'increment'})}>
                <KeyboardArrowRight/>
              </IconButton>
            </AppHeader>
            <StepperContainer>
                <Fab
                    onClick={() => dispatch({ type: 'TIMER_BUTTON_CLICKED', payload: {timeLeft} })}
                    color='primary'
                    aria-label={state.isTimerTicking ? 'stop timer' : 'start timer'}
                    aria-pressed={state.isTimerTicking}
                    style={{ marginBottom: '2rem' }}
                >
                    {renderIcon(state.isTimerTicking, state.level, state.intervalIndex, timeLeft)}
                </Fab>
                <LevelIndicator aria-live='polite'>Level {state.level}</LevelIndicator>
                <DotsStepper activeStep={state.level - 1} dispatch={dispatch} stepCount={Object.keys(intervals).length} />
            </StepperContainer>
        </FlexCenter>
    );
};

export default App;
