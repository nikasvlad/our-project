let player;
const videoContainer = $('.player');

let eventsList = () => {
  $('.player__start').click(e =>{
    e.preventDefault();
    if (videoContainer.hasClass('paused')) {
      // videoContainer.removeClass('paused');
      player.pauseVideo()      
    }else{
      // videoContainer.addClass('paused');
      player.playVideo()
    }

  });

  $('.player__playback').click(e => {
    const bar = $(e.currentTarget);
    const clickedPosition =  e.originalEvent.layerX;
    const NewButtonPositionPercent = (clickedPosition / bar.width()) * 100;
    const newPlaybackPosition = (player.getDuration() / 100) * NewButtonPositionPercent;

    $('.player__playback-btn').css({'left' : `${NewButtonPositionPercent}%`});

    player.seekTo(newPlaybackPosition);
  });
    $('.player__compos-preveiw').click(e => {
    // let newTargets = e.currentTarget;
    player.playVideo();
  });
};

const formatTime = timeSec => {
  const roundTime = Math.round(timeSec);

  const minutes = addZero(Math.floor(roundTime / 60));
  const seconds = addZero(roundTime - minutes * 60);

  function addZero(num){
    return num < 10 ? `0${num}` : num;
  };

  return `${minutes} : ${seconds}`;
};

const onPlayerReady = () => {
  let interval;

  const durationSeconds = player.getDuration();

  $('.player__duration-estimate').text(formatTime(durationSeconds));

  if (typeof interval != 'undefined') {
    clearInterval(interval)
  }

  interval = setInterval(() => {
    const completedSec = player.getCurrentTime();
    const completedPercent = (completedSec / durationSeconds) * 100;
    $('.player__playback-btn').css({'left' : `${completedPercent}%`});
    $('.player__duration-completed').text(formatTime (completedSec)); 
  }, 1000);
};

const onPlayerStateChange = event => {
  switch (event.data){
    case 1:
      videoContainer.addClass('active');
      videoContainer.addClass('paused');
      break;
    
    case 2:
      videoContainer.removeClass('active');
      videoContainer.removeClass('paused'); 
      break;
  }
}

function onYouTubeIframeAPIReady() {
  player = new YT.Player('player--video', {
    height: '357',
    width: '662',
    videoId: '8jJgNdi-u5k',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    },
    playerVars: {
      controls: 0,
      disablekb: 0,
      // showinfo: 0,
      rel: 0,
      autoplay: 0,
      modestbranding: 0
    }
  });
}

eventsList();