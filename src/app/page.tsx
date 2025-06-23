'use client';

import {useEffect, useState} from 'react';
import {CiCoffeeCup} from 'react-icons/ci';
import {FaDiscord, FaPlus} from 'react-icons/fa';
import {GoCircle} from 'react-icons/go';
import {GrLanguage} from 'react-icons/gr';
import {IoLogoFacebook} from 'react-icons/io';
import {IoMdArrowDropdown} from 'react-icons/io';
import {MdVerifiedUser} from 'react-icons/md';
import CallGroupPreview from '@components/CallGroupPreview';
import packageJson from '../../package.json';
type CallGroupPreviewType = {
    language: string;
    level: string;
    subtitle: string;
    isMicrophoneDisabled: boolean;
    numberOfParticipants: number;
};

function HomePage() {
    const [showModal, setShowModal] = useState(false);
    const [callGroups, setCallGroups] = useState<CallGroupPreviewType[]>([]);
    const numberOfGroups = 10;
    useEffect(() => {
        // Fetch from Express API
        fetch("http://192.168.253.221:3000/call-group-preview")
        .then((response) => response.json())
            .then((data) => setCallGroups(data))
            .catch((error) => console.error('Error fetching call groups:', error));
    }, []);
    console.log("callGroups",callGroups)

    return (
        <>
            <main className="p-6">
                <div className="pb-8 flex justify-between px-58">
                    <div className="relative group inline-flex items-center gap-2 cursor-pointer">
                        <GrLanguage className="w-8 h-8" />
                        <span className="font-serif text-2xl">Fluent Fam</span>

                        <div className="absolute left-1/2 top-full mt-2 -translate-x-1/2 bg-black text-white text-xs rounded-md px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                            Fluent Fam ver {packageJson.version}
                        </div>
                    </div>

                    <button className="flex items-center gap-1 rounded-full pr-2 border border-blue-500 text-blue-500 hover:border-blue-700 transition-colors cursor-pointer">
                        <GoCircle className="text-black border border-white/50 rounded-full w-8 h-8" />
                        Samran
                        <IoMdArrowDropdown className="text-lg" />
                    </button>
                </div>
                <text className="flex justify-center text-3xl pb-10">Language practice community</text>
                <div className="flex gap-2 justify-center">
                    <button
                        onClick={() => setShowModal(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 cursor-pointer"
                    >
                        <FaPlus /> Create a new group
                    </button>

                    <button className="bg-yellow-600 text-white px-4 py-2 rounded flex items-center gap-2 border border-transparent hover:border-blue-700 cursor-pointer font-[cursive]">
                        <CiCoffeeCup className="text-2xl"/> Buy me a coffee
                    </button>

                    <button className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 border border-transparent hover:border-blue-700 cursor-pointer">
                        <MdVerifiedUser /> Privacy policy
                    </button>

                    <button className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 border border-transparent hover:border-blue-700 cursor-pointer">
                        <FaDiscord style={{color: '#5865F2'}} />
                        Free4Talk Discord
                    </button>

                    <button className="bg-gray-800 text-white px-4 py-2 rounded flex items-center gap-2 border border-transparent hover:border-blue-700 cursor-pointer">
                        <IoLogoFacebook />
                        Facebook group
                    </button>
                </div>
                <div className="grid grid-cols-3 gap-4 px-25 pt-10 justify-center">
                {callGroups.map((group, index) => (
                       <CallGroupPreview
                       key={index}
                       language={group.language}
                       level={group.level}
                       subtitle={group.subtitle}
                       isMicrophoneDisabled={group.isMicrophoneDisabled}
                       numberOfParticipants={group.numberOfParticipants}
                   />
                    ))}
                </div>

                {showModal && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center"
                        onClick={() => setShowModal(false)}
                    >
                        <div
                            className="bg-white p-6 rounded shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-xl font-bold mb-4">Create a Group</h2>
                            {/* Upcoming form here */}
                            <button
                                onClick={() => setShowModal(false)}
                                className="mt-4 px-3 py-1 bg-red-500 text-white rounded"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default HomePage;
