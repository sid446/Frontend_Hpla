import React from "react";
import { Link } from "react-router-dom";

function LifeMembers() {
    return (
        <>
            <h1 className="text-3xl">List Of Members of HPLA</h1>
            <hr />
            <div className="text-xl text-teal-500 mt-3 underline">
                <ul>
                    <li>
                    <Link to="https://drive.google.com/file/d/1x3pVuBbkfq9QyyiaECCSWohm73f1itlX/view" target="_blank" rel="noreferrer">List of Members (Life-long, Ordinary & Students)</Link>
                    </li>
                </ul>
            
        </div>
        </>
        
    );
}

export default LifeMembers;
