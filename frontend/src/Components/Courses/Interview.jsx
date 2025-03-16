import React, { useRef, useState } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Interview() {
    const roomID = import.meta.env.VITE_ROOMID;
    const appID = Number(import.meta.env.VITE_APPID);
    const serverSecret = import.meta.env.VITE_SECRETSERVER;
    const meetingContainerRef = useRef(null);
    const [isInterviewCompleted, setIsInterviewCompleted] = useState(false);
    const [isMeetingActive, setIsMeetingActive] = useState(false); // Renamed from isMeetting

    const startInterview = async () => {
        const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
            appID,
            serverSecret,
            roomID,
            Date.now().toString(),
            "Jerry"
        );

        const zc = ZegoUIKitPrebuilt.create(kitToken);
        zc.joinRoom({
            container: meetingContainerRef.current,
            scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall,
            },
            onLeaveRoom: () => {
                setIsInterviewCompleted(true);
                setIsMeetingActive(false);
            },
        });
        setIsMeetingActive(true); // Show the meeting container when interview starts
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative">
            {!isInterviewCompleted ? (
                <>
                    <h1 className="text-3xl font-bold mb-4">CodeHire Interview Room</h1>
                    <button
                        onClick={startInterview}
                        className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition mb-4 z-10"
                    >
                        Start Interview
                    </button>
                    <div 
                        ref={meetingContainerRef} 
                        className={`w-full h-screen absolute top-0 ${isMeetingActive ? 'z-[100000]' : 'hidden'}`}
                    ></div>
                </>
            ) : (
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4">Interview Completed</h1>
                    <p className="text-lg text-gray-600">Thank you for participating in the CodeHire interview.</p>
                </div>
            )}
        </div>
    );
}

export default Interview;