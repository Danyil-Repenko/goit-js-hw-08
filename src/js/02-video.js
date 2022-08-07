import Player from "@vimeo/player";
import throttle from 'lodash.throttle';

const iframe = document.querySelector('#vimeo-player');
const player = new Player(iframe);
const ITEM_IN_LOCAL_STORAGE = 'videoplayer-current-time';

function onVideoPlaying(data) {
    const currentTime = data.seconds;
    localStorage.setItem(ITEM_IN_LOCAL_STORAGE, JSON.stringify(currentTime));
}

player.on('timeupdate', throttle(onVideoPlaying, 1000));

function checkItem(timeStamp) {
    if (timeStamp) {
        const timeToSet = localStorage.getItem(timeStamp);
        return JSON.parse(timeToSet);
    }

    return 0;
}

player.setCurrentTime(checkItem(ITEM_IN_LOCAL_STORAGE));