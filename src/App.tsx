import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { intervals } from './constants/intervals';
import { useInterval } from './hooks/useInterval';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Fab from '@material-ui/core/Fab';
import { PlayArrow, Pause, ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';

const FlexCenter = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
`;

const LevelIndicator = styled.h1`
    margin-top: 0;
`;

const TimeButtonGroup = styled(ButtonGroup)`
    min-width: 100px;
    height: 90%;
    overflow: auto;
`;

const AppHeader = styled.header`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Counter = styled.p`
    font-size: 2.5rem;
    font-weight: 700;
    margin: 0;
`;

const MainContainer = styled.main`
    display: flex;
    align-items: center;
    height: 100%;
`;

type TimeButtonProps = {
    selected: boolean;
};
const TimeButton = styled(Button)<TimeButtonProps>`
    &&& {
        background-color: ${({ selected }) => (selected ? 'hotpink' : 'inherit')};
        color: ${({ selected }) => (selected ? 'black' : 'inherit')};
    }
`;

const App = () => {
    const [level, setLevel] = useState(1);
    const [timeIndex, setTimeIndex] = useState(0);
    const [start, setStart] = useState(false);

    const [timeLeft, setTimeLeft] = useState(intervals[level][timeIndex]);

    useEffect(() => setTimeIndex(0), [level]);

    useEffect(() => {
        setStart(false);
        setTimeLeft(intervals[level][timeIndex]);
    }, [timeIndex, level]);

    useInterval(
        () => {
            if (timeLeft > 0) {
                setTimeLeft(time => time - 1);
            }
            if (timeLeft === 0) {
              setStart(false);
              setTimeout(() => {
                setTimeIndex(timeIndex => {
                  if (timeIndex < intervals[level].length - 1) {
                      return timeIndex + 1;
                  }
                  return 0;
              });
              }, 0)
            }
        },
        start ? 1000 : null
    );

    const incrementLevel = () => {
        if (level < 8) {
            setLevel(level => level + 1);
        }
    };
    const decrementLevel = () => {
        if (level > 1) {
            setLevel(level => level - 1);
        }
    };
    return (
        <FlexCenter>
            <AppHeader>
                <LevelIndicator aria-live='polite'>Level {level}</LevelIndicator>
                <Counter aria-live={start ? 'polite' : 'off'}>{timeLeft}</Counter>
            </AppHeader>
            <MainContainer>
                <IconButton
                    disabled={level === 1 ? true : false}
                    onClick={() => decrementLevel()}
                    aria-label='go to previous level'
                >
                    <ArrowBackIos />
                </IconButton>
                <TimeButtonGroup orientation='vertical' color='primary' aria-label='time selector button group'>
                    {intervals[level].map((time, index) => (
                        <TimeButton
                            onClick={() => {
                                setStart(false);
                                setTimeIndex(index);
                            }}
                            aria-label={`Select time period of ${time} seconds`}
                            key={`${time}${index}`}
                            selected={index === timeIndex}
                        >
                            {time}
                        </TimeButton>
                    ))}
                </TimeButtonGroup>
                <IconButton
                    disabled={level === 8 ? true : false}
                    onClick={() => incrementLevel()}
                    aria-label='next level'
                >
                    <ArrowForwardIos />
                </IconButton>
                <Fab
                    onClick={() => setStart(start => !start)}
                    style={{ position: 'absolute', bottom: '16px', right: '16px' }}
                    color='primary'
                    aria-label={start ? 'stop timer' : 'start timer'}
                >
                    {start ? <Pause /> : <PlayArrow />}
                </Fab>
            </MainContainer>
        </FlexCenter>
    );
};

export default App;
