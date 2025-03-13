import React, { useRef } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

function Interview() {
    const roomID = import.meta.env.VITE_ROOMID;
    const appID = Number(import.meta.env.VITE_APPID);
    const serverSecret = import.meta.env.VITE_SECRETSERVER;
    const meetingContainerRef = useRef(null);

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
        });

        // Request full screen
        if (meetingContainerRef.current.requestFullscreen) {
            meetingContainerRef.current.requestFullscreen();
        } else if (meetingContainerRef.current.mozRequestFullScreen) { 
            meetingContainerRef.current.mozRequestFullScreen();
        } else if (meetingContainerRef.current.webkitRequestFullscreen) { 
            meetingContainerRef.current.webkitRequestFullscreen();
        } else if (meetingContainerRef.current.msRequestFullscreen) { 
            meetingContainerRef.current.msRequestFullscreen();
        }
    };

    

    const redirectToNewPage = () => {
        window.location.href = "/new-page";
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">CodeHire Interview Room</h1>
            <button
                onClick={startInterview}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition mb-4"
            >
                Start Interview
            </button>
           
            <div ref={meetingContainerRef} className="w-full h-full"></div>
        </div>
    );
}

export default Interview;