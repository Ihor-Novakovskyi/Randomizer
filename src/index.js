import React from 'react';
import { Component } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Clock, Display, Button, Digit, TextButton  } from './timer-block';
import styled from 'styled-components';



class Timer extends Component {
    setTime = () => {
        this.setState(({seconds, minutes}) => {
            seconds++;
            if(seconds !== 60) {
                return {
                    seconds: seconds,
                }
            } else {
                minutes++;
                return {
                    minutes: minutes,
                    seconds: 0
                }
            }
        })
    }

    state = {
        seconds: this.props.secondsValue,
        minutes: this.props.minutesValue,
        clearInterval: null,
        timerActive: false,
        firstButton: false,
        secondButton: false,
    }

    onStartTimerOrPause = () => {
        if(!this.state.timerActive){
            this.setState({
                clearInterval: setInterval(this.setTime, 1000),
                timerActive: true, 
            })
        } else {
            clearInterval(this.state.clearInterval);
            this.setState(({timerActive}) => ({
                timerActive: !timerActive,
            }))
        }
    }

    onButtonEnter = (e) => {
        console.log(1)
        this.setState({[e.currentTarget.name]: true})
    }

    onButtonLeave = (e) => {
        console.log(e.currentTarget.name)
        this.setState({[e.currentTarget.name]: false})
    }

    onClearDiggit = () => {
        if(!this.state.timerActive) {
            this.setState({
                seconds: 0,
                minutes: 0,  
            })
        }
    }

    setDiggits = (seconds, minutes) => {
        if (seconds < 10) seconds = '0' + seconds;
        if (minutes < 10) minutes = '0' + minutes;

        return {
            seconds: seconds,
            minutes: minutes,
        }
    }


    render() {
    const {onStartTimerOrPause, onClearDiggit, onButtonEnter, onButtonLeave, setDiggits } = this;
    let { minutes: min, seconds: sec, firstButton, secondButton } = this.state;
    let { seconds, minutes } = setDiggits(sec, min);
    let timerDisplayColor = this.state.timerActive ?  
    {
        backgroundColor: 'rgb(182, 232, 3)',
    } : null;

   let [firstButtonStyle, secondButtonStyle] = [firstButton, secondButton]
    .map(element => {
        if(element) {
            return {
                transition: 'filter 0.5s',
                filter: 'drop-shadow(0 0 0.6rem rgb(249, 246, 246)',
                color: 'rgb(0, 255, 0)'
            }
        } else {
            return {
                transition: 'filter 0.5s', 
            }
        }
    })

        return (
        <Clock>
            <Display style={timerDisplayColor}>
                <Digit>{minutes}</Digit>
                <Digit>:</Digit>
                <Digit>{seconds}</Digit>
            </Display>
            <Button style={firstButtonStyle} onMouseLeave={onButtonLeave} onMouseEnter={onButtonEnter} onClick={onStartTimerOrPause} name='firstButton'><TextButton>Start/Pause</TextButton></Button>
            <Button style={secondButtonStyle} onMouseLeave={onButtonLeave} onMouseEnter={onButtonEnter} onClick={onClearDiggit} name='secondButton'><TextButton>Clear</TextButton></Button>
        </Clock>
        )
    }
}


    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(<Timer secondsValue={0} minutesValue={0}/>)
