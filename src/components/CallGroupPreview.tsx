import { CiMicrophoneOff } from 'react-icons/ci';
import { IoSettingsOutline } from "react-icons/io5";

type CallGroupPreviewType = {
    language: string;
    level: string;
    subtitle: string;
    isMicrophoneDisabled: boolean;
    numberOfParticipants: number;
};

function CallGroupPreview({ language, level, subtitle, isMicrophoneDisabled, numberOfParticipants }: CallGroupPreviewType) {
    const circleSize = 24; // width/height of each circle
    const gap = 8;

    return (
        <div className="flex justify-between h-75 w-95 bg-black text-white p-4 rounded-lg items-start">
            {/* Left side content */}
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <strong>{language}</strong>
                    <span>{level}</span>
                    {isMicrophoneDisabled && <CiMicrophoneOff className="text-red-500" />}
                </div>
                <span className="text-sm mt-0.5 text-white/80">{subtitle}</span>
            </div>

            {/* Right side: Circles + Settings icon */}
            <div className="flex items-center gap-3">
            {Array.from({ length: numberOfParticipants }, (_, i) => (
                        <svg
                            key={i}
                            width={circleSize}
                            height={circleSize}
                            viewBox={`0 0 ${circleSize} ${circleSize}`}
                        >
                            <circle
                                cx={circleSize / 2}
                                cy={circleSize / 2}
                                r={(circleSize / 2) - 2}
                                stroke="dodgerblue"
                                strokeDasharray="3,3"
                                strokeWidth="1.5"
                                fill="none"
                            />
                        </svg>
                    ))}

                <IoSettingsOutline className="text-xl text-blue-500 cursor-pointer hover:text-blue-700 transition" />
            </div>
        </div>
    );
}

export default CallGroupPreview;