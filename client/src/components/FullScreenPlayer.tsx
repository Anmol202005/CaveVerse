import { MonitorUp } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { VideoPlayer } from "./VideoPlayer";
export default function FullScreenPlayer({
    username,
    stream,
    setIsFullScreen,
}: {
    username: string;
    stream: MediaStream;
    setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    return (
        <Dialog open onOpenChange={setIsFullScreen}>
            <DialogContent className="room-dialog full-screen-dialog">
                <DialogHeader>
                    <span className="room-eyebrow">
                        <MonitorUp size={15} /> TOGETHER IN THIS OFFICE
                    </span>
                    <DialogTitle>{username}’s screen</DialogTitle>
                    <DialogDescription>
                        A closer look at what they’re sharing.
                    </DialogDescription>
                </DialogHeader>
                <VideoPlayer
                    stream={stream}
                    controls
                    className="expanded-screen-video"
                />
            </DialogContent>
        </Dialog>
    );
}
