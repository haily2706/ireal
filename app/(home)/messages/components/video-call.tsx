"use client";

import { LiveKitRoom, VideoConference, PreJoin, type LocalUserChoices } from "@livekit/components-react";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { getToken } from "@/app/actions/livekit";
import { Button } from "@/components/ui/button";
import { CustomLocalUserChoices, CustomPreJoin } from "./pre-join";
import { useRoomContext } from "@livekit/components-react";
import { Volume2, ChevronDown } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface VideoCallProps {
    room: string;
    username: string; // This is actually the identity (ID)
    userName?: string; // This is the display name
    onDisconnect: () => void;
    className?: string;
    children?: React.ReactNode;
}

export function VideoCall({ room, username, userName, onDisconnect, className, children }: VideoCallProps) {
    const [token, setToken] = useState("");
    const [error, setError] = useState("");
    const [preJoinChoices, setPreJoinChoices] = useState<CustomLocalUserChoices | undefined>(undefined);

    useEffect(() => {
        (async () => {
            try {
                // Pass the display name to getToken if available
                const generatedToken = await getToken(room, username, userName);
                setToken(generatedToken);
            } catch (e) {
                console.error("Failed to generate token", e);
                setError("Failed to connect to the call. Please check your connection and try again.");
            }
        })();
    }, [room, username, userName]);

    if (error) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-background/95 backdrop-blur-sm flex-col gap-4 p-6 text-center">
                <p className="text-destructive font-medium">{error}</p>
                <Button onClick={onDisconnect} variant="outline">Close</Button>
            </div>
        );
    }

    if (!token) {
        return (
            <div className="flex h-full w-full items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Connecting to secure call...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={`relative flex flex-col h-full w-full bg-background overflow-hidden ${className || ''}`}>
            {/* Override styles for PreJoin and LiveKit components */}
            <style dangerouslySetInnerHTML={{
                __html: `
                /* Override LiveKit CSS Variables for Theme Support */
                [data-lk-theme="default"] {
                    background-color: transparent !important;
                    --lk-bg: transparent !important;
                    --lk-control-bg: transparent !important;
                    --lk-control-fg: hsl(var(--foreground)) !important;
                    --lk-text-muted: hsl(var(--muted-foreground)) !important;
                }

                /* Container Backgrounds */
                .lk-video-conference, 
                .lk-video-conference-inner,
                .lk-focus-layout-wrapper, 
                .lk-grid-layout-wrapper,
                .lk-control-bar {
                    background-color: transparent !important;
                }

                /* Button Styling */
                .lk-button {
                    color: hsl(var(--foreground)) !important;
                    background-color: transparent !important;
                }
                
                .lk-button:hover {
                    background-color: hsl(var(--accent) / 0.5) !important;
                }

                /* Hide standard chat toggle since we have our own */
                .lk-chat-toggle { display: none !important; }
            `}} />            {!preJoinChoices ? (
                <CustomPreJoin
                    room={room}
                    username={username}
                    userName={userName || "Participant"}
                    onSubmit={setPreJoinChoices}
                    onCancel={onDisconnect}
                />
            ) : (
                <LiveKitRoom
                    video={preJoinChoices.videoEnabled ? { deviceId: preJoinChoices.videoDeviceId } : false}
                    audio={preJoinChoices.audioEnabled ? { deviceId: preJoinChoices.audioDeviceId } : false}
                    token={token}
                    serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
                    data-lk-theme="default"
                    style={{ height: '100%', width: '100%' }}
                    onDisconnected={onDisconnect}
                    onError={(err) => {
                        console.error("LiveKit error:", err);
                        setError("An error occurred with the video connection.");
                    }}
                >
                    <VideoConference />
                    <AudioOutputController initialDeviceId={preJoinChoices.audioOutputDeviceId} />
                </LiveKitRoom>
            )}



            {/* Children typically contain overlays */}
            {children}
        </div>
    );
}

function AudioOutputController({ initialDeviceId }: { initialDeviceId?: string }) {
    const room = useRoomContext();
    const [devices, setDevices] = useState<MediaDeviceInfo[]>([]);
    const [selectedId, setSelectedId] = useState<string>(initialDeviceId || "default");
    const [isSupported, setIsSupported] = useState(false);

    useEffect(() => {
        // @ts-ignore
        if ('setSinkId' in HTMLMediaElement.prototype) {
            setIsSupported(true);
            navigator.mediaDevices.enumerateDevices().then(devs => {
                setDevices(devs.filter(d => d.kind === 'audiooutput'));
            });
        }
    }, []);

    useEffect(() => {
        if (initialDeviceId && room && isSupported) {
            room.switchActiveDevice('audiooutput', initialDeviceId)
                .catch(err => console.error("Failed to set audio output", err));
        }
    }, [initialDeviceId, room, isSupported]);

    const handleSelect = async (deviceId: string) => {
        if (room) {
            try {
                await room.switchActiveDevice('audiooutput', deviceId);
                setSelectedId(deviceId);
            } catch (err) {
                console.error("Failed to switch audio output", err);
            }
        }
    };

    if (!isSupported || devices.length === 0) return null;

    return (
        <div className="absolute top-4 right-16 z-50">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="bg-background/50 hover:bg-background/80 hover:text-foreground rounded-2xl backdrop-blur-sm transition-all duration-300 shadow-lg h-10 w-10 text-muted-foreground"
                    >
                        <Volume2 className="h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px] z-[60]">
                    {devices.map((device) => (
                        <DropdownMenuItem
                            key={device.deviceId}
                            onClick={() => handleSelect(device.deviceId)}
                            className="justify-between cursor-pointer"
                        >
                            <span className="truncate flex-1">
                                {device.label || `Speaker ${device.deviceId.slice(0, 4)}`}
                            </span>
                            {selectedId === device.deviceId && (
                                <div className="h-2 w-2 rounded-full bg-primary" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
}
