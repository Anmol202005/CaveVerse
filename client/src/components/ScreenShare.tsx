import { useEffect, useState } from "react";
import {
    Expand,
    LoaderCircle,
    MonitorUp,
    ScreenShare as ShareIcon,
    ScreenShareOff,
} from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { toast } from "sonner";
import { useAppSelector } from "../app/hooks";
import { VideoPlayer } from "./VideoPlayer";
import FullScreenPlayer from "./FullScreenPlayer";
import phaserGame from "../game/main";
import { GameScene } from "../game/scenes/GameScene";
import store from "../app/store";
import { stopScreenSharing } from "../app/features/webRtc/screenSlice";

export default function ScreenShare({
    screenDialogOpen,
    setScreenDialogOpen,
}: {
    screenDialogOpen: boolean;
    setScreenDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const peers = useAppSelector((state) => state.screen.peerStreams);
    const myStream = useAppSelector((state) => state.screen.myScreenStream);
    const [expanded, setExpanded] = useState<{
        stream: MediaStream;
        username: string;
        key: string;
    }>();
    const [starting, setStarting] = useState(false);
    useEffect(() => {
        if (expanded && !peers.has(expanded.key)) setExpanded(undefined);
    }, [peers, expanded]);
    const startSharing = async () => {
        setStarting(true);
        try {
            await (
                phaserGame.scene.keys.GameScene as GameScene
            ).startScreenSharing();
            setScreenDialogOpen(false);
            toast.success("Your screen is now shared with this office.");
        } catch {
            toast(
                "Screen sharing wasn’t started. You can try again whenever you’re ready.",
            );
        } finally {
            setStarting(false);
        }
    };
    return (
        <>
            <Dialog open={screenDialogOpen} onOpenChange={setScreenDialogOpen}>
                <DialogContent
                    className="room-dialog screen-dialog"
                    onOpenAutoFocus={() =>
                        (
                            phaserGame.scene.keys.GameScene as GameScene
                        ).disableKeys()
                    }
                    onCloseAutoFocus={() =>
                        (
                            phaserGame.scene.keys.GameScene as GameScene
                        ).enableKeys()
                    }
                >
                    <DialogHeader>
                        <span className="dialog-illustration">
                            <MonitorUp size={26} />
                        </span>
                        <span className="room-eyebrow">
                            A LITTLE SPACE TO CREATE
                        </span>
                        <DialogTitle>
                            Better ideas, shared together.
                        </DialogTitle>
                        <DialogDescription>
                            Share your screen with the people in your current
                            office.
                        </DialogDescription>
                    </DialogHeader>
                    {myStream || peers.size ? (
                        <div className="screen-grid">
                            {myStream && (
                                <div className="shared-screen">
                                    <VideoPlayer stream={myStream} muted />
                                    <span>
                                        Your screen <small>Sharing now</small>
                                    </span>
                                </div>
                            )}
                            {Array.from(peers.entries()).map(([key, value]) => (
                                <button
                                    className="shared-screen"
                                    key={key}
                                    onClick={() =>
                                        setExpanded({
                                            stream: value.stream,
                                            username: value.username,
                                            key,
                                        })
                                    }
                                    aria-label={`Expand ${value.username ?? "guest"}’s screen`}
                                >
                                    <VideoPlayer stream={value.stream} />
                                    <span>
                                        {value.username ?? "Guest"}’s screen{" "}
                                        <Expand size={15} />
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="screens-empty">
                            <MonitorUp size={45} strokeWidth={1.3} />
                            <h3>A blank canvas, for now.</h3>
                            <p>
                                Show what you’re working on.
                                <br />A window, a tab, or your whole screen.
                            </p>
                        </div>
                    )}
                    <DialogFooter>
                        <button
                            className={`room-primary-button ${myStream ? "stop-sharing" : ""}`}
                            onClick={
                                myStream
                                    ? () => {
                                          store.dispatch(stopScreenSharing());
                                          toast("Screen sharing stopped.");
                                      }
                                    : startSharing
                            }
                            disabled={starting}
                        >
                            {starting ? (
                                <LoaderCircle
                                    size={17}
                                    className="animate-spin"
                                />
                            ) : myStream ? (
                                <ScreenShareOff size={17} />
                            ) : (
                                <ShareIcon size={17} />
                            )}
                            {starting
                                ? "Starting…"
                                : myStream
                                  ? "Stop sharing"
                                  : "Share your screen"}
                        </button>
                    </DialogFooter>
                    <p className="dialog-note">
                        Your choice. You can stop sharing at any time.
                    </p>
                </DialogContent>
            </Dialog>
            {expanded && (
                <FullScreenPlayer
                    username={expanded.username ?? "Guest"}
                    stream={expanded.stream}
                    setIsFullScreen={(open) => {
                        if (!open) setExpanded(undefined);
                    }}
                />
            )}
        </>
    );
}
