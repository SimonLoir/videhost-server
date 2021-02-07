import React from 'react';
import Hls from 'hls.js';
export default class Player extends React.Component {
    private player;
    public state = {};
    public componentDidUpdate() {
        const video = this.player;
        const hls = new Hls();
        const file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:14
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:13.646967,
http://localhost:3000/videos/dGVzdA/index0.ts
#EXTINF:0.100100,
http://localhost:3000/videos/dGVzdA/index1.ts
#EXT-X-ENDLIST`;
        const enc = new TextEncoder();

        hls.loadSource(URL.createObjectURL(new Blob([enc.encode(file)])));
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    public render() {
        return (
            <video
                className='videoCanvas'
                ref={(player) => (this.player = player)}
                autoPlay={true}
            />
        );
    }
}
