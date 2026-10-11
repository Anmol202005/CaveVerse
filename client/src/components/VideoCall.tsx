import { CameraOff, MicOff } from "lucide-react";
import { useAppSelector } from "../app/hooks";
import { VideoPlayer } from "./VideoPlayer";

export default function VideoCall() {
    const stream = useAppSelector((state) => state.webcam.myWebcamStream);
    const peers = useAppSelector((state) => state.webcam.peerStreams);
    const disconnected = useAppSelector(
        (state) => state.webcam.isDisconnectedFromVideoCalls,
    );
    const camera = useAppSelector((state) => state.webcam.isWebcamOn);
    const mic = useAppSelector((state) => state.webcam.isMicOn);
    if (disconnected || (!stream && !peers.size)) return null;
    return (
        <section className="room-videos" aria-label="Video calls">
            {stream && (
                <div className="room-video">
                    <VideoPlayer stream={stream} muted />
                    {!camera && (
                        <div className="video-camera-off">
                            <CameraOff size={23} />
                            <span>Camera is off</span>
                        </div>
                    )}
                    <div className="video-caption">
                        <span>
                            You <small>Your little corner</small>
                        </span>
                        {!mic && <MicOff size={14} />}
                    </div>
                </div>
            )}
            {Array.from(peers.entries()).map(([key, value]) => (
                <div className="room-video" key={key}>
                    <VideoPlayer stream={value.stream} />
                    <div className="video-caption">
                        <span>Nearby guest</span>
                        <span className="room-status-dot" />
                    </div>
                </div>
            ))}
        </section>
    );
}
