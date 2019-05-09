function isFullscreenEnabled() {
    return document.fullscreenEnabled ||
        document.mozFullScreenEnabled ||
        document.webkitFullscreenEnabled ||
        document.msFullscreenEnabled || false;
}

function isFullscreen() {
    return document.isFullscreen ||
        document.webkitIsFullScreen ||
        document.mozIsFullScreen ||
        document.msIsFullScreen || false;
}

function requestFullscreen() {
    var docElm = document.documentElement;
    //W3C
    if (docElm.requestFullscreen) {
        docElm.requestFullscreen();
    }
    //FireFox
    else if (docElm.mozRequestFullScreen) {
        docElm.mozRequestFullScreen();
    }
    //Chrome等
    else if (docElm.webkitRequestFullScreen) {
        docElm.webkitRequestFullScreen();
    }
    //IE11
    else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
    }
}

function exitFullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    }
    else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
    }
    else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
    }
    else if (document.msExitFullscreen) {
        document.msExitFullscreen();
    }
}

export { isFullscreenEnabled, isFullscreen, requestFullscreen, exitFullscreen }