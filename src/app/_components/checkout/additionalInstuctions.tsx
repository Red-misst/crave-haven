'use client'
import { useState } from "react";

const AdditionalInstructions: React.FC = () => {

    const [instructions , setInstructions] = useState('')
    const handleChange = ()=>{

    }
    return (
        <div className="  dark:bg-gray-800 rounded-xl h-full flex flex-col w-full">
            <h3 className="text-lg font-semibold my-4 flex justify-center">Additional Instructions</h3>

            <textarea
                name="instructions"
                placeholder="Enter any special instructions (e.g., leave at the gate)..."
                value={instructions}
                onChange={handleChange}
                className="w-full p-3 mb-4 flex-grow rounded-lg border bg-gray-200 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                rows={5}
            />
        </div>
    );
};

export default AdditionalInstructions;
