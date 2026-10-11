import Chat from "./components/Chat";
import { useAppSelector } from "./app/hooks";
import RoomSelection from "./components/RoomSelection/RoomSelection";
import ScreenShare from "./components/ScreenShare";
import { useState } from "react";
import FloatingActions from "./components/FloatingActions";
import { AnimatePresence } from "framer-motion";
import VideoCall from "./components/VideoCall";
import CornerActionButtons from "./game/CornerActionButtons";
import RoomHeader from "./components/RoomHeader";
import { Toaster } from "sonner";
import "./components/room.css";

function App() {
    const roomJoined = useAppSelector((state) => state.room.roomJoined);
    const showOfficeChat = useAppSelector((state) => state.chat.showOfficeChat);
    const [screenDialogOpen, setScreenDialogOpen] = useState(false);
    const [showChat, setShowChat] = useState(false);

    return (
        <>
            {!roomJoined && (
                <>
                    <RoomSelection />
                </>
            )}
            {roomJoined && (
                <div className={`room-ui ${showChat ? "chat-is-open" : ""}`}>
                    <RoomHeader isInsideOffice={showOfficeChat} />
                    {showChat && <Chat setShowChat={setShowChat} />}
                    <VideoCall />
                    <AnimatePresence mode="wait">
                        <FloatingActions
                            key="floating-buttons"
                            isInsideOffice={showOfficeChat}
                            showChat={showChat}
                            setScreenDialogOpen={setScreenDialogOpen}
                            setShowChat={setShowChat}
                        />
                    </AnimatePresence>
                    <CornerActionButtons />
                    <Toaster
                        position="top-center"
                        closeButton
                        toastOptions={{ className: "room-toast" }}
                    />
                </div>
            )}

            {showOfficeChat && (
                <>
                    <ScreenShare
                        screenDialogOpen={screenDialogOpen}
                        setScreenDialogOpen={setScreenDialogOpen}
                    />
                </>
            )}
        </>
    );
}

export default App;
