import React from 'react';

export default function SessionCards(props) {
    return (
        <div className="card">

            <p>Session No:{props.no}</p>
            <h2>Session name:{props.Sname}</h2>
            <p className="Pname">Speaker :{props.Pname}</p>
            <p>Duration :{props.duration}</p>
            <p>
                <button >Update</button>
                <button >Delete</button>
            </p>

        </div>
    );
}

