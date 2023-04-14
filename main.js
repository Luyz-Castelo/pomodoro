function main() {
  const pomodoroText = document.querySelector('.pomodoro-text');
  const pomodoroTimer = document.querySelector('.pomodoro-timer');
  const audio = document.querySelector('#audio');
  let interval;
  let isPaused = false;

  function addButtonsListeners() {
    const pauseUnpauseButton = document.querySelector('#pause-unpause-timer');
    const studyTimerButton = document.querySelector('#study-timer');
    const breakTimerButton = document.querySelector('#break-timer');
    const muteUnmuteButton = document.querySelector('#mute-unmute');

    pauseUnpauseButton.addEventListener('click', event => pauseUnpauseTimer(event.target));
    studyTimerButton.addEventListener('click', () => startTimer('study'));
    breakTimerButton.addEventListener('click', () => startTimer('break'));
    muteUnmuteButton.addEventListener('click', event => muteUnmuteAudio(event.target));
  }

  function startTimer(typeOfTimer) {
    clearInterval(interval);

    if (typeOfTimer === 'study') {
      pomodoroText.innerText = 'FOCUS!!!';
      const studyTime = document.querySelector('#study-time');
      const endTime = getEndTime(studyTime.value);

      initializeClock(endTime);
    } else {
      pomodoroText.innerText = 'Take a break';
      const breakTime = document.querySelector('#break-time');
      const endTime = getEndTime(breakTime.value);

      initializeClock(endTime);
    }
  }

  function getEndTime(value) {
    const timeInMilliseconds = Number(value) * 60000;
    const endTime = Number(new Date().getTime() + timeInMilliseconds);

    return endTime;
  }

  function getTimeRemaining(endtimeInMilliseconds) {
    const total = endtimeInMilliseconds - Date.parse(new Date());
    const seconds = Math.floor((total / 1000) % 60) || 0;
    const minutes = Math.floor((total / 1000 / 60) % 60) || 0;
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24) || 0;

    return {
      total,
      hours,
      minutes,
      seconds,
    };
  }

  function initializeClock(endTimeInMilliseconds) {
    interval = setInterval(() => {
      const timeRemaining = getTimeRemaining(endTimeInMilliseconds);
      if (!isPaused) {
        pomodoroTimer.innerText = `${timeRemaining.hours}:${timeRemaining.minutes}:${timeRemaining.seconds}`;
        if (timeRemaining.total <= 0) timerHasEnded();
        return;
      }
      endTimeInMilliseconds += 1000;
    }, 1000);
  }

  function timerHasEnded() {
    clearInterval(interval);
    interval = null;
    audio.currentTime = 0;
    audio.play();
  }

  function pauseUnpauseTimer(target) {
    isPaused = !isPaused;
    changePauseButtonStyle(isPaused, target);
  }

  function changePauseButtonStyle(isPaused, pauseUnpauseButton) {
    if (isPaused) {
      pauseUnpauseButton.innerText = 'Unpause timer';
      pauseUnpauseButton.classList.remove('unpaused');
      pauseUnpauseButton.classList.add('paused');
      return;
    }
    pauseUnpauseButton.innerText = 'Pause timer';
    pauseUnpauseButton.classList.remove('paused');
    pauseUnpauseButton.classList.add('unpaused');
  }

  function muteUnmuteAudio(muteUnmuteButton) {
    audio.muted = !audio.muted;
    if (audio.muted) {
      muteUnmuteButton.innerText = 'Unmute audio';
      muteUnmuteButton.classList.remove('mute');
      muteUnmuteButton.classList.add('unmute');
      return;
    }
    muteUnmuteButton.innerText = 'Mute audio';
    muteUnmuteButton.classList.remove('mute');
    muteUnmuteButton.classList.add('unmute');
  }

  addButtonsListeners();
}

main();
