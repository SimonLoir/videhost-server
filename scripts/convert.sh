ffmpeg -i filename.mp4 -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls filename.m3u8
 # use
#const file = `#EXTM3U
#EXT-X-VERSION:3
#EXT-X-TARGETDURATION:14
#EXT-X-MEDIA-SEQUENCE:0
#EXTINF:13.646967,
http://localhost:3000/videos/dGVzdA/index0.ts
#EXTINF:0.100100,
http://localhost:3000/videos/dGVzdA/index1.ts
#EXT-X-ENDLIST`;
#const enc = new TextEncoder();
#hls.loadSource(URL.createObjectURL(new Blob([enc.encode(file)])));*/