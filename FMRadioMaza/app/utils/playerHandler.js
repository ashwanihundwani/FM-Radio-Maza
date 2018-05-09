module.exports = async (data) => {
    console.log("Playback State: " + JSON.stringify(data))
    if(data.type == 'playback-state') {
        // Update the UI with the new state
    } else if(data.type == 'remote-play') {
        // The play button was pressed, we can forward this command to the player using
        //TrackPlayer.play();
    } else if(data.type == 'remote-seek') {
        // Again, we can forward this command to the player using
        //TrackPlayer.seekTo(data.position);
    }
    if(data.type == 'playback-error') {
        console.log("Error received")
        console.log(JSON.stringify(data))
    }
    // ...
};