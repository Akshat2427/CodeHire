import React, { useRef, useState, useEffect } from 'react';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios';

function Interview({ c_id, onProgressUpdate, setActive }) {
    const roomID = import.meta.env.VITE_ROOMID;
    const appID = Number(import.meta.env.VITE_APPID);
    const serverSecret = import.meta.env.VITE_SECRETSERVER;
    const meetingContainerRef = useRef(null);
    const [isInterviewCompleted, setIsInterviewCompleted] = useState(false);
    const [isMeetingActive, setIsMeetingActive] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    // Track window size to detect mobile screens
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    async function updateProgress() {
        const resp = await axios.post(`http://localhost:8080/user/update-progress/${c_id}`, {
            current_round: "N/A",
            progress_percentage: 100,
            score: ["100", "100", "100"]
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token_codehire")}`,
            }
        });
    }

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
            onLeaveRoom: async () => {
                zc.destroy();
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                    stream.getTracks().forEach((track) => track.stop());
                } catch (err) {
                    console.error("Failed to stop media devices:", err);
                }
                toast.success("Interview Completed");
                await updateProgress();
                onProgressUpdate();
                setTimeout(() => {
                    setActive("Resume");
                }, 1000)
                setIsInterviewCompleted(true);
                setIsMeetingActive(false);
            },
        });
        setIsMeetingActive(true);
    };

    return (
        <>
            <ToastContainer />
            {isMobile ? (
                <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                    <h1 className="text-3xl font-bold mb-4 text-center">
                        Please use a desktop device to access the interview room.
                    </h1>
                </div>
            ) : (
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
                            <p className="text-lg text-gray-600">
                                Thank you for participating in the CodeHire interview.
                            </p>
                        </div>
                    )}
                </div>
            )}
        </>
    );
}

export default Interview;
