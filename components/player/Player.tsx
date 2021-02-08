import React from 'react';
import Hls from 'hls.js';
export default class Player extends React.Component {
    private player;
    public state: { hls: Hls } = { hls: undefined };
    public componentDidMount() {
        const video = this.player;
        const hls = new Hls();

        hls.loadSource('/api/playlist/live');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        hls.on(Hls.Events.ERROR, function (e, d) {
            console.log(e, d);
        });
        hls.on(Hls.Events.LEVEL_LOADED, function () {
            console.log(hls.levels);
        });
        hls.on(Hls.Events.LEVEL_SWITCHED, () => {
            console.log(hls.currentLevel);
        });
        this.setState({ hls });
    }
    public render() {
        return (
            <video
                ref={(player) => (this.player = player)}
                autoPlay={true}
                controls
            />
        );
    }
}
