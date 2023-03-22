const { createElement, Component } = React;

class PomodoroTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startTime: null,
      timeLeft: 25 * 60,
      isRunning: false,
    };
    this.startTimer = this.startTimer.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      if (this.state.isRunning) {
        const currentTime = new Date();
        const timeElapsed = Math.floor((currentTime - this.state.startTime) / 1000);
        const timeLeft = 25 * 60 - timeElapsed;
        if (timeLeft >= 0) {
          this.setState({ timeLeft });
        } else {
          this.stopTimer();
        }
      }
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  startTimer() {
    this.setState({ startTime: new Date(), isRunning: true });
  }

  stopTimer() {
    this.setState({ isRunning: false });
  }

  resetTimer() {
    this.setState({ timeLeft: 25 * 60, isRunning: false });
  }

  render() {
    const minutes = Math.floor(this.state.timeLeft / 60);
    const seconds = this.state.timeLeft % 60;

    return createElement("div", null, [
      createElement("h1", null, "Pomodoro Timer"),
      createElement("p", null, `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`),
      createElement("button", { onClick: this.startTimer }, "Start"),
      createElement("button", { onClick: this.stopTimer }, "Stop"),
      createElement("button", { onClick: this.resetTimer }, "Reset"),
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


