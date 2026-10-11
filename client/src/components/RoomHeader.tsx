import { DoorOpen, Mountain } from "lucide-react";
export default function RoomHeader({
    isInsideOffice,
}: {
    isInsideOffice: boolean;
}) {
    return (
        <header className="room-header">
            <div className="room-wordmark">
                <span>
                    <Mountain size={21} strokeWidth={2.3} />
                </span>
                <strong>
                    Cave<span>Verse</span>
                </strong>
            </div>
            <span className="room-header-divider" />
            <div className="room-location">
                <span className="room-eyebrow">YOUR LITTLE WORLD</span>
                <span>
                    <DoorOpen size={13} />
                    {isInsideOffice ? "Office space" : "The common space"}
                </span>
            </div>
        </header>
    );
}
