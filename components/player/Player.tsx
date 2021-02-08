import React from 'react';
import Hls from 'hls.js';
export default class Player extends React.Component {
    private player;
    public state = {};
    public componentDidMount() {
        const video = this.player;
        const hls = new Hls();

        //hls.loadSource('https://vps.loir.xyz/hls/test.m3u8');
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
        hls.on(Hls.Events.ERROR, function (e, d) {
            console.log(e, d);
        });
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
