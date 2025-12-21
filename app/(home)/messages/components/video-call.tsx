"use client";

import {
    LiveKitRoom,
    PreJoin,
    type LocalUserChoices,
    useRoomContext,
    useTracks,
    ParticipantTile,
    RoomAudioRenderer,
    ControlBar
} from "@livekit/components-react";
import { Track } from "livekit-client";
import "@livekit/components-styles";
import { useEffect, useState } from "react";
import { Loader2, X } from "lucide-react";
import { getToken } from "@/app/actions/livekit";
import { Button } from "@/components/ui/button";
import { CustomLocalUserChoices, CustomPreJoin } from "./pre-join";

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
                /* Override LiveKit CSS Variables for Theme Support */
                [data-lk-theme="default"] {
                    background-color: transparent !important;
                    --lk-bg: transparent !important;
                    --lk-control-bg: transparent !important;
                    --lk-control-fg: hsl(var(--foreground)) !important;
                }

                /* Unified Control Dock Container - Transparent */
                .unified-control-dock {
                    background-color: transparent !important;
                    border: none !important;
                    padding: 8px 0 !important;
                    backdrop-filter: none !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 16px !important;
                    box-shadow: none !important;
                    pointer-events: auto !important;
                }
                
                /* Reset standard control bar styles since they are now wrappers */
                .lk-control-bar {
                    background-color: transparent !important;
                    border: none !important;
                    padding: 0 !important;
                    box-shadow: none !important;
                    margin: 0 !important;
                    gap: 12px !important;
                }

                /* Button Styling - Consistent Glassmorphism & Theme Aware */
                .lk-button, .custom-dock-button {
                    color: hsl(var(--foreground)) !important;
                    background-color: hsl(var(--background) / 0.6) !important;
                    backdrop-filter: blur(12px) !important;
                    border: 1px solid hsl(var(--border) / 0.2) !important;
                    border-radius: 50% !important; /* Fully circular */
                    height: 48px !important;
                    width: 48px !important;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1) !important;
                    box-shadow: none !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }
                
                .lk-button:hover {
                    background-color: hsl(var(--foreground) / 0.1) !important;
                    transform: scale(1.1) !important;
                    color: hsl(var(--primary)) !important;
                    border-color: hsl(var(--primary) / 0.3) !important;
                }

                /* Active/Off states for cam/mic */
                .lk-button[aria-pressed="false"] {
                    // background-color: hsl(var(--destructive) / 0.15) !important;
                    // color: hsl(var(--destructive)) !important;
                    // border-color: hsl(var(--destructive) / 0.3) !important;
                }

                /* Disconnect Button specifically - Red Circle */
                .lk-disconnect-button {
                    background-color: #ef4444 !important; /* red-500 */
                    color: white !important;
                    border: none !important;
                    box-shadow: none !important;
                    height: 48px !important;
                    width: 48px !important;
                    padding: 0 !important;
                    border-radius: 50% !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                }

                .lk-disconnect-button:hover {
                    background-color: hsl(var(--destructive) / 0.9) !important;
                    transform: scale(1.05) !important;
                }

                /* Hide standard chat toggle since we have our own */
                .lk-chat-toggle { display: none !important; }

                /* Device Menu (Dropdown) - Theme Aware Popover */
                .lk-device-menu {
                    background-color: hsl(var(--popover) / 0.95) !important;
                    border: 1px solid hsl(var(--border)) !important;
                    box-shadow: none !important;
                    border-radius: 12px !important;
                    backdrop-filter: blur(16px) !important;
                    color: hsl(var(--popover-foreground)) !important;
                    padding: 0.5rem !important;
                    width: max-content !important;
                    min-width: 300px !important;
                    max-width: 90vw !important;
                    display: flex !important;
                    flex-direction: column !important;
                    gap: 6px !important;
                }
                
                /* Ensure list item text follows theme */
                .lk-device-menu .lk-list-item,
                .lk-device-menu li,
                .lk-device-menu button {
                     color: hsl(var(--popover-foreground)) !important;
                }

                /* Reset generic list items to prevent double-boxing */
                .lk-device-menu li {
                    background: transparent !important;
                    margin: 0 !important;
                    padding: 0 !important;
                    list-style: none !important;
                }

                /* Style the interactive element (button) */
                .lk-device-menu button,
                .lk-device-menu .lk-list-item {
                    border-radius: 8px !important;
                    transition: all 0.2s !important;
                    background-color: transparent !important;
                    color: hsl(var(--popover-foreground)) !important;
                    white-space: nowrap !important;
                    padding: 0.75rem 1rem !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: flex-start !important;
                    gap: 12px !important;
                    font-size: 14px !important;
                    border: none !important;
                    cursor: pointer !important;
                    width: 100% !important;
                    text-align: left !important;
                }

                .lk-device-menu button:hover,
                .lk-device-menu .lk-list-item:hover {
                    background-color: hsl(var(--accent)) !important;
                    color: hsl(var(--accent-foreground)) !important;
                }
                
                /* Force transparency on all children to prevent nested background artifacts */
                .lk-device-menu button *,
                .lk-device-menu .lk-list-item * {
                     background-color: transparent !important;
                }
                
                /* Selection state */
                .lk-device-menu button[aria-selected="true"],
                .lk-device-menu .lk-list-item[aria-selected="true"] {
                     background-color: hsl(var(--accent) / 0.5) !important;
                     color: hsl(var(--accent-foreground)) !important;
                }

                /* Button Groups (Split buttons for Mic/Cam) */
                .lk-button-group {
                    background-color: transparent !important;
                    border: none !important;
                    display: flex !important;
                    align-items: center !important;
                    gap: 4px !important; /* Visual separation for split btn */
                }
                
                /* Force the arrow button (dropdown trigger) to be theme aware */
                .lk-button-group-menu-trigger {
                    border: none !important; /* Remove line, make separate bubble */
                    border-left: none !important;
                    color: hsl(var(--foreground)) !important;
                    background-color: hsl(var(--foreground) / 0.05) !important;
                    border-radius: 50% !important;
                    height: 36px !important;
                    width: 36px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    margin-left: -16px !important; /* Tuck it next to the main btn */
                    z-index: 10 !important;
                    transform: translateX(8px);
                    box-shadow: none !important;
                }
                
                .lk-button-group-menu-trigger:hover {
                    background-color: hsl(var(--foreground) / 0.1) !important;
                    color: hsl(var(--primary)) !important;
                }

                /* Global Shadow Reset */
                .lk-participant-tile, .lk-list-item, .lk-grid-layout, .lk-focus-layout {
                    box-shadow: none !important;
                }
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
                    <CustomVideoConference />
                    {/* AudioOutputController is now inside CustomVideoConference */}
                </LiveKitRoom>
            )}



            {/* Children typically contain overlays */}
            {children}
        </div>
    );
}

function CustomVideoConference() {
    const tracks = useTracks(
        [
            { source: Track.Source.Camera, withPlaceholder: true },
            { source: Track.Source.ScreenShare, withPlaceholder: false },
        ],
        { onlySubscribed: false },
    );

    // Remote
    const remoteScreenShare = tracks.find(track => !track.participant.isLocal && track.source === Track.Source.ScreenShare);
    const remoteCamera = tracks.find(track => !track.participant.isLocal && track.source === Track.Source.Camera);
    const mainTrack = remoteScreenShare || remoteCamera;

    // Local
    const localTrack = tracks.find(track => track.participant.isLocal && track.source === Track.Source.Camera);

    return (
        <div className="relative h-full w-full bg-background transition-colors duration-300">
            {/* Remote Video (Full Screen) */}
            <div className="absolute inset-0 flex items-center justify-center z-0 p-2">
                {mainTrack ? (
                    <ParticipantTile
                        trackRef={mainTrack}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    <div className="flex flex-col items-center justify-center text-muted-foreground p-4">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p>Waiting for connection...</p>
                    </div>
                )}
            </div>

            {/* Local Video (PIP) - Moved to Bottom Right to avoid overlap with Chat Toggle */}
            {localTrack && (
                <div className="absolute bottom-28 right-4 w-[240px] aspect-video rounded-xl overflow-hidden border border-border/40 z-30 transition-all hover:scale-105 group">
                    {/* Mirror local video usually */}
                    <ParticipantTile
                        trackRef={localTrack}
                        className="h-full w-full object-cover"
                    />
                </div>
            )}


            {/* Unified Controls Dock */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-40 w-full max-w-fit px-4 pointer-events-none">
                <div className="unified-control-dock">
                    {/* Speaker Control (Left) */}
                    <AudioOutputController />

                    {/* Standard Controls (Center) */}
                    <ControlBar
                        variation="minimal"
                        controls={{ microphone: true, camera: true, screenShare: true, chat: false, leave: true, settings: false }}
                    />
                </div>
            </div>

            <RoomAudioRenderer />
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

        <div className="relative">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="lk-button" // Use standard LiveKit button class for consistency
                        aria-label="Audio Output"
                    >
                        <Volume2 className="h-5 w-5" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" side="top" className="w-[200px] z-[60] mb-4">
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
