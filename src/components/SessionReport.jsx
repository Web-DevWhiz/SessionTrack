import React, { useState } from 'react'
import { useEffect } from 'react';

export const SessionReport = () => {
    const defaultParticipants = [
        "Adithyan ND", "Afzal A", "Amarnath", "Anand P S", "Anusree P",
        "Chaidhanya Suresh", "Fathima Nabeela Ali", "Fayaz ismail", "Jobin T",
        "John Philip", "Mariyam Jahangir", "Muhammad Inshad", "MuhammadAli Kv",
        "Rohan Varghese", "Safeedha mk", "Sreejith TK", "SulthanSha N",
        "Vaishnav T", "Sreerag T Valsan", "Aflah", "Gokul", "Sinan",
        "Mohammed shahid", "Rasim"
    ];
    const [sessionDate, setSessionDate] = useState(new Date().toISOString().split("T")[0]);
    const [sessionTime, setSessionTime] = useState('12:00 PM - 1:00 PM');
    const [groupCode, setGroupCode] = useState('');
    const [trainer, setTrainer] = useState('');
    const [coordinator, setCoordinator] = useState('');
    const [discussionTopic, setDiscussionTopic] = useState('');
    const [sessionReport, setSessionReport] = useState('');
    const [meetingLink, setMeetingLink] = useState('');
    const [meetingList, setMeetingList] = useState('');
    const [reportCreator, setReportCreator] = useState('');
    const [participants, setParticipants] = useState([]);
    const [newParticipant, setNewParticipant] = useState('');
    const [generatedReport, setGeneratedReport] = useState('');
    const [showModal, setShowModal] = useState(false);

    const [participantStatus, setParticipantStatus] = useState({});
    useEffect(() => {
        const uniqueParticipants = [...new Set([...participants, ...defaultParticipants])];

        const newStatus = { ...participantStatus };
        // newParticipantsList.forEach(p => {
        //     if (!newStatus[p]) {
        //         newStatus[p] = 'present';
        //     }
        // });

        setParticipants(uniqueParticipants);
        setParticipantStatus(newStatus);
    }, [])

    // Add a new participant
    const addParticipant = () => {
        if (newParticipant.trim()) {
            const updatedParticipants = [...participants, newParticipant.trim()];
            setParticipants(updatedParticipants);
            setParticipantStatus({ ...participantStatus, [newParticipant.trim()]: 'present' });
            setNewParticipant('');
        }
    };

    const updateParticipantStatus = (participant, status) => {
        setParticipantStatus({ ...participantStatus, [participant]: status });
    };

    const removeParticipant = (participant) => {
        const updatedParticipants = participants.filter(p => p !== participant);
        const updatedStatus = { ...participantStatus };
        delete updatedStatus[participant];
        setParticipants(updatedParticipants);
        setParticipantStatus(updatedStatus);
    };

    const importParticipants = () => {
        const importText = prompt("Paste your list of participants (one per line):");
        if (importText) {
            const newParticipantsList = importText
                .split('\n')
                .map(p => p.trim())
                .filter(p => p.length > 0);

            const uniqueParticipants = [...new Set([...participants, ...newParticipantsList])];

            const newStatus = { ...participantStatus };
            newParticipantsList.forEach(p => {
                if (!newStatus[p]) {
                    newStatus[p] = 'present';
                }
            });

            setParticipants(uniqueParticipants);
            setParticipantStatus(newStatus);
        }
    };

    const generateReport = () => {
        const presentParticipants = participants.filter(p => participantStatus[p] === 'present');
        const otherSessionParticipants = participants.filter(p => participantStatus[p] === 'other');
        const absentParticipants = participants.filter(p => participantStatus[p] === 'absent');

        const participantCounts = {
            present: presentParticipants.length,
            absent: absentParticipants.length,
            other: otherSessionParticipants.length,
            total: participants.length
        };

        const reportText = `COMMUNICATION SESSION REPORT📓
🗓: ${sessionDate.split("-").reverse().join("-")}
⏰: ${sessionTime}
🔰: ${groupCode}
👩‍🏫: Trainer: ${trainer}
Coordinator 👩‍💻: ${coordinator}

Session Report: ${discussionTopic ? `\nTopic: ${discussionTopic}`: ""}

${sessionReport}
${participantCounts.present > 0 ? 
`\nParticipants ✅ - ${participantCounts.present}:
- ${presentParticipants.join('\n- ')}\n`: ""
}${participantCounts.other > 0 ?
`\nAssigned Other Session - ${participantCounts.other}:
- ${otherSessionParticipants.join('\n- ')}\n`: ""
}${participantCounts.absent > 0?
`\nAbsentees ❌ - ${participantCounts.absent}:
- ${absentParticipants.join('\n- ')}\n`: ""
}
Meeting Video Link 🔗: ${meetingLink}
${meetingList.trim() != "" ? `\nMeetList Link: ${meetingList}\n`: ""}
Report Created By ✍ : ${reportCreator}`;

        setGeneratedReport(reportText);
        setShowModal(true);
        return reportText;
    };

    // Copy to clipboard functionality
    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedReport)
            .then(() => {
                const copyButton = document.getElementById('copy-button');
                copyButton.textContent = 'Copied!';
                copyButton.classList.remove('bg-blue-600');
                copyButton.classList.add('bg-green-600');

                setTimeout(() => {
                    copyButton.textContent = 'Copy to Clipboard';
                    copyButton.classList.remove('bg-green-600');
                    copyButton.classList.add('bg-blue-600');
                }, 2000);
            })
            .catch(err => {
                console.error('Failed to copy report: ', err);
            });
    };

    const participantCounts = {
        present: participants.filter(p => participantStatus[p] === 'present').length,
        absent: participants.filter(p => participantStatus[p] === 'absent').length,
        other: participants.filter(p => participantStatus[p] === 'other').length,
        total: participants.length
    };
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-4">
            <div className="max-w-full mx-auto px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Communication Session Report Generator</h1>
                    <p className="text-gray-600">Create professional session reports with ease</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Session Details Form */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="mr-2">📝</span> Session Details
                        </h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                                <input
                                    type="date"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={sessionDate}
                                    onChange={(e) => setSessionDate(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                                <input
                                    type="text"
                                    placeholder="12:00 PM - 1:00 PM"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={sessionTime}
                                    onChange={(e) => setSessionTime(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Group Code</label>
                                <input
                                    type="text"
                                    placeholder="BCR67 Group-2"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={groupCode}
                                    onChange={(e) => setGroupCode(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Trainer</label>
                                <input
                                    type="text"
                                    placeholder="Trainer"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={trainer}
                                    onChange={(e) => setTrainer(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Coordinator</label>
                                <input
                                    type="text"
                                    placeholder="Coordinator"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={coordinator}
                                    onChange={(e) => setCoordinator(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
                                <input
                                    type="text"
                                    placeholder="Is this topic relavent?"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={discussionTopic}
                                    onChange={(e) => setDiscussionTopic(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Session Report</label>
                                <textarea
                                    rows="6"
                                    placeholder="Enter the session report details here..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={sessionReport}
                                    onChange={(e) => setSessionReport(e.target.value)}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">TLDV Link</label>
                                <input
                                    type="url"
                                    placeholder="https://tldv.io/app/meetings/..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={meetingLink}
                                    onChange={(e) => setMeetingLink(e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Meet List Link</label>
                                <input
                                    type="url"
                                    placeholder=" https://meetlist.io/meetings/..."
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={meetingList}
                                    onChange={(e) => setMeetingList(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Report Created By</label>
                                <input
                                    type="text"
                                    placeholder="User"
                                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                    value={reportCreator}
                                    onChange={(e) => setReportCreator(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Participants Management */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center">
                            <span className="mr-2">👥</span> Participants
                        </h2>

                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Add new participant..."
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                                value={newParticipant}
                                onChange={(e) => setNewParticipant(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addParticipant()}
                            />
                            <button
                                onClick={addParticipant}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Add
                            </button>
                        </div>

                        <div className="flex justify-between mb-4">
                            <button
                                onClick={importParticipants}
                                className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg transition-colors flex items-center"
                            >
                                <span className="mr-1">📥</span> Import List
                            </button>

                            <div className="flex gap-2 text-sm">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg">Present: {participantCounts.present}</span>
                                <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-lg">Other: {participantCounts.other}</span>
                                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg">Absent: {participantCounts.absent}</span>
                            </div>
                        </div>

                        <div className="mb-2 flex gap-2">
                            <span className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-medium transition-colors ${participantCounts.total === participantCounts.present ? 'bg-green-500 text-white' : 'bg-gray-100 hover:bg-green-100'}`}
                                onClick={() => {
                                    const newStatus = { ...participantStatus };
                                    participants.forEach(p => {
                                        newStatus[p] = 'present';
                                    });
                                    setParticipantStatus(newStatus);
                                }}
                            >
                                Mark All Present
                            </span>

                            <span className={`cursor-pointer px-3 py-1 rounded-lg text-sm font-medium transition-colors ${participantCounts.total === participantCounts.absent ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-red-100'}`}
                                onClick={() => {
                                    const newStatus = { ...participantStatus };
                                    participants.forEach(p => {
                                        newStatus[p] = 'absent';
                                    });
                                    setParticipantStatus(newStatus);
                                }}
                            >
                                Mark All Absent
                            </span>
                        </div>

                        {participants.length > 0 ? (
                            <div className="border border-gray-200 rounded-lg overflow-hidden">
                                <div className="max-h-190 overflow-y-auto">
                                    {participants.map((participant, index) => (
                                        <div key={index} className="border-b border-gray-100 last:border-0 transition-all hover:bg-gray-50">
                                            <div className="flex items-center p-3">
                                                <div className="flex-1 font-medium truncate" title={participant}>
                                                    {participant}
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${participantStatus[participant] === 'present' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-green-100'}`}
                                                        onClick={() => updateParticipantStatus(participant, 'present')}
                                                        title="Mark as Present"
                                                    >
                                                        ✓
                                                    </button>
                                                    <button
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${participantStatus[participant] === 'other' ? 'bg-yellow-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-yellow-100'}`}
                                                        onClick={() => updateParticipantStatus(participant, 'other')}
                                                        title="Assigned to Other Session"
                                                    >
                                                        ⟲
                                                    </button>
                                                    <button
                                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${participantStatus[participant] === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-400 hover:bg-red-100'}`}
                                                        onClick={() => updateParticipantStatus(participant, 'absent')}
                                                        title="Mark as Absent"
                                                    >
                                                        ✕
                                                    </button>
                                                    <button
                                                        className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors"
                                                        onClick={() => removeParticipant(participant)}
                                                        title="Remove Participant"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                                <p>No participants added yet</p>
                                <p className="text-sm mt-2">Add participants or import a list</p>
                            </div>
                        )}
                    </div>

                    {/* Generate Report Button and Summary Section */}
                    <div className="lg:col-span-1 bg-white p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg">
                        <h2 className="text-xl font-bold mb-6 text-gray-800 flex items-center">
                            <span className="mr-2">📊</span> Report Generation
                        </h2>
                        
                        <div className="space-y-6">
                            <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                                <h3 className="font-medium text-blue-800 mb-2">Report Summary</h3>
                                <div className="grid grid-cols-2 gap-2">
                                    <div className="text-sm text-gray-600">Date:</div>
                                    <div className="text-sm font-medium">{sessionDate ? sessionDate.split("-").reverse().join("-") : "Not set"}</div>
                                    
                                    <div className="text-sm text-gray-600">Time:</div>
                                    <div className="text-sm font-medium">{sessionTime || "Not set"}</div>
                                    
                                    <div className="text-sm text-gray-600">Group:</div>
                                    <div className="text-sm font-medium">{groupCode || "Not set"}</div>
                                    
                                    <div className="text-sm text-gray-600">Topic:</div>
                                    <div className="text-sm font-medium truncate" title={discussionTopic}>{discussionTopic || "Not set"}</div>
                                    
                                    <div className="text-sm text-gray-600">Participants:</div>
                                    <div className="text-sm font-medium">{participantCounts.present} present, {participantCounts.absent} absent</div>
                                </div>
                            </div>
                            
                            <div className="text-center">
                                <button
                                    onClick={generateReport}
                                    className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-medium"
                                >
                                    <span>Generate Report</span>
                                </button>
                                
                                <p className="text-sm text-gray-500 mt-2">
                                    Generate a complete report based on the information provided
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Popup for Generated Report */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-screen flex flex-col">
                        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-bold">Communication Session Report</h3>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="p-1 rounded-full hover:bg-gray-100"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-6">
                            <div className="bg-gray-800 text-gray-100 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
                                {generatedReport}
                            </div>
                        </div>
                        
                        <div className="p-4 border-t border-gray-200 flex justify-end gap-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Close
                            </button>
                            <button
                                id="copy-button"
                                onClick={copyToClipboard}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Copy to Clipboard
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}