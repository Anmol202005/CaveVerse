import { useState, type ReactNode } from "react";
import {
    Camera,
    CameraOff,
    LoaderCircle,
    MessageSquareText,
    Mic,
    MicOff,
    PhoneOff,
    ScreenShare,
} from "lucide-react";
import store from "../app/store";
import { useAppSelector } from "../app/hooks";
import { toggleMic, toggleWebcam } from "../app/features/webRtc/webcamSlice";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import phaserGame from "../game/main";
import { GameScene } from "../game/scenes/GameScene";
import { toast } from "sonner";

function RoomControl({
    icon,
    label,
    help,
    onClick,
    active,
    danger,
    disabled,
    pressed,
}: {
    icon: ReactNode;
    label: string;
    help: string;
    onClick: () => void;
    active?: boolean;
    danger?: boolean;
    disabled?: boolean;
    pressed?: boolean;
}) {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <button
                    type="button"
                    className={`room-control ${active ? "active" : ""} ${danger ? "danger" : ""}`}
                    aria-label={help}
                    aria-pressed={pressed}
                    disabled={disabled}
                    onClick={onClick}
                >
                    {icon}
                    <span>{label}</span>
                </button>
            </TooltipTrigger>
            <TooltipContent className="room-tooltip" sideOffset={10}>
                {help}
            </TooltipContent>
        </Tooltip>
    );
}

export default function FloatingActions({
    isInsideOffice,
    showChat,
    setScreenDialogOpen,
    setShowChat,
}: {
    isInsideOffice: boolean;
    showChat: boolean;
    setScreenDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setShowChat: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const [shouldReconnect, setShouldReconnect] = useState(false);
    const [cameraLoading, setCameraLoading] = useState(false);
    const stream = useAppSelector((state) => state.webcam.myWebcamStream);
    const startCamera = async () => {
        setCameraLoading(true);
        try {
            await (phaserGame.scene.keys.GameScene as GameScene).startWebcam(
                shouldReconnect,
            );
            toast.success("Camera and microphone are ready.");
        } catch {
            toast.error(
                "Camera or microphone access isn’t available. You can still explore and chat.",
            );
        } finally {
            setCameraLoading(false);
        }
    };
    return (
        <div className="room-dock" role="toolbar" aria-label="Room controls">
            <div className="dock-controls">
                <RoomControl
                    icon={<MessageSquareText size={21} />}
                    label="Chat"
                    help={showChat ? "Hide room chat" : "Show room chat"}
                    active={showChat}
                    pressed={showChat}
                    onClick={() => setShowChat(!showChat)}
                />
                <span className="dock-divider" />
                {stream ? (
                    <WebcamButtons
                        setShouldConnectToOtherPlayers={setShouldReconnect}
                    />
                ) : (
                    <RoomControl
                        icon={
                            cameraLoading ? (
                                <LoaderCircle
                                    size={21}
                                    className="animate-spin"
                                />
                            ) : (
                                <CameraOff size={21} />
                            )
                        }
                        label={cameraLoading ? "Starting…" : "Camera off"}
                        help="Turn on camera and microphone"
                        disabled={cameraLoading}
                        onClick={startCamera}
                    />
                )}
                {isInsideOffice && (
                    <>
                        <span className="dock-divider" />
                        <RoomControl
                            icon={<ScreenShare size={21} />}
                            label="Share"
                            help="Open shared screens"
                            onClick={() => setScreenDialogOpen(true)}
                        />
                    </>
                )}
            </div>
            <div className="dock-caption">
                <span className="room-status-dot" />
                {isInsideOffice
                    ? "A little space to work together"
                    : "Walk closer to connect with someone"}
            </div>
        </div>
    );
}

export function WebcamButtons({
    shouldShowDisconnectButton = true,
    setShouldConnectToOtherPlayers,
}: {
    shouldShowDisconnectButton?: boolean;
    setShouldConnectToOtherPlayers?: (value: boolean) => void;
}) {
    const camera = useAppSelector((state) => state.webcam.isWebcamOn);
    const mic = useAppSelector((state) => state.webcam.isMicOn);
    return (
        <>
            <RoomControl
                icon={camera ? <Camera size={21} /> : <CameraOff size={21} />}
                label={camera ? "Camera on" : "Camera off"}
                help={camera ? "Turn off camera" : "Turn on camera"}
                pressed={camera}
                active={camera}
                onClick={() => store.dispatch(toggleWebcam())}
            />
            <RoomControl
                icon={mic ? <Mic size={21} /> : <MicOff size={21} />}
                label={mic ? "Mic on" : "Mic off"}
                help={mic ? "Mute microphone" : "Unmute microphone"}
                pressed={mic}
                active={mic}
                onClick={() => store.dispatch(toggleMic())}
            />
            {shouldShowDisconnectButton && (
                <RoomControl
                    icon={<PhoneOff size={21} />}
                    label="Disconnect"
                    help="Disconnect from video calls"
                    danger
                    onClick={() => {
                        (
                            phaserGame.scene.keys.GameScene as GameScene
                        ).playerStoppedWebcam();
                        setShouldConnectToOtherPlayers?.(true);
                        toast("Disconnected from video calls.");
                    }}
                />
            )}
        </>
    );
}
