import {
    ArrowUpRight,
    Globe2,
    Info,
    Keyboard,
    LockKeyhole,
    MessageCircle,
    MonitorUp,
} from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover";

export default function CornerActionButtons() {
    return (
        <div className="room-guide-trigger">
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        className="room-help-button"
                        aria-label="Open room guide"
                    >
                        <Info size={18} />
                        <span>Room guide</span>
                    </button>
                </PopoverTrigger>
                <PopoverContent
                    className="room-guide"
                    side="top"
                    align="start"
                    sideOffset={12}
                >
                    <span className="room-eyebrow">MAKE YOURSELF AT HOME</span>
                    <h2>A little guide to your world.</h2>
                    <p>Good company is just a few steps away.</p>
                    <ul>
                        <li>
                            <span>
                                <Keyboard size={19} />
                            </span>
                            <div>
                                <strong>Take a little wander</strong>
                                <p>
                                    Use the arrow keys to move. Click the map
                                    after chatting to get back to exploring.
                                </p>
                            </div>
                        </li>
                        <li>
                            <span>
                                <MessageCircle size={19} />
                            </span>
                            <div>
                                <strong>Closer feels more connected</strong>
                                <p>
                                    Walk near someone to connect with proximity
                                    voice and video.
                                </p>
                            </div>
                        </li>
                        <li>
                            <span>
                                <MonitorUp size={19} />
                            </span>
                            <div>
                                <strong>Make something together</strong>
                                <p>
                                    Inside offices, connect with everyone, chat
                                    privately, and share your screen.
                                </p>
                            </div>
                        </li>
                        <li>
                            <span>
                                <LockKeyhole size={19} />
                            </span>
                            <div>
                                <strong>Your own little corner</strong>
                                <p>
                                    Custom rooms can be open or protected with a
                                    password.
                                </p>
                            </div>
                        </li>
                    </ul>
                    <div className="guide-footer">
                        <Globe2 size={14} /> A small world, made for real
                        connection.
                        <ArrowUpRight size={14} />
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
