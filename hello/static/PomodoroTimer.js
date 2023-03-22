const { createElement, Component } = React;

class PomodoroTimer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeLeft: 25 * 60, // 25 minutes in seconds
      isRunning: false,
      status: 'work',
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.isRunning && this.state.timeLeft > 0) {
        this.setState({ timeLeft: this.state.timeLeft - 1 });
      }
      if (this.state.timeLeft == 0) {
	      this.setState({status: 'break'});
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    this.setState({ isRunning: true });
  }

  stopTimer() {
    this.setState({ isRunning: false });
  }

  resetTimer() {
    this.setState({ timeLeft: 10, isRunning: false });
  }

  render() {
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;

    return React.createElement("div", null, [
      React.createElement("h1", null, `Pomodoro Timer ${this.state.status}`, this.state.status),
      React.createElement("p", null, `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`),
      React.createElement("button", { onClick: this.startTimer }, "Start"),
      React.createElement("button", { onClick: this.stopTimer }, "Stop"),
      React.createElement("button", { onClick: this.resetTimer }, "Reset"),
    ]);
  }
}

ReactDOM.render(React.createElement(PomodoroTimer), document.getElementById("root"));

function getCurrentEasternTime() {
  const now = new Date();
  const easternTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hours = easternTime.getHours();
  return [easternTime, hours];
}

console.log(getCurrentEasternTime());


