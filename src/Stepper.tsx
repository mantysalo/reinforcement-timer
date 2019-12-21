import React from 'react';
import MobileStepper from '@material-ui/core/MobileStepper';
import Button from '@material-ui/core/Button';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { ActionType } from './reducers/appReducer';
import styled from 'styled-components';

const StyledMobileStepper = styled(MobileStepper)`
  width: 100%;
`

export const DotsStepper = (props: { stepCount: number; activeStep: number; dispatch: React.Dispatch<ActionType> }) => {
    return (
        <StyledMobileStepper
            variant='dots'
            steps={props.stepCount}
            position='static'
            activeStep={props.activeStep}
            nextButton={
                <Button
                    size='small'
                    onClick={() => props.dispatch({ type: 'LEVEL_CHANGED', payload: 'increment' })}
                    disabled={props.activeStep === props.stepCount - 1}
                >
                    Next
                    <KeyboardArrowRight />
                </Button>
            }
            backButton={
                <Button
                    size='small'
                    onClick={() => props.dispatch({ type: 'LEVEL_CHANGED', payload: 'decrement' })}
                    disabled={props.activeStep === 0}
                >
                    <KeyboardArrowLeft />
                    Back
                </Button>
            }
        />
    );
};
