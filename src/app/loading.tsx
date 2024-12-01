import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    );
};

export default Loading;
