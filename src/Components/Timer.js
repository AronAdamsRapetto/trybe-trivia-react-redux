import React from 'react';
import PropTypes from 'prop-types';
import './styleSheet/Timer.css';

class Timer extends React.Component {
  componentDidMount() {
    const { updateTimer } = this.props;
    updateTimer();
  }

  componentDidUpdate(prevProps) {
    const { isAnswered, time, intervalId } = prevProps;
    if (isAnswered || time === 1) {
      clearInterval(intervalId);
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <p className="timer" data-testid="timer-question">{ time }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  time: PropTypes.number.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  intervalId: PropTypes.number.isRequired,
  updateTimer: PropTypes.func.isRequired,
};

export default Timer;
