// // // src/Components/PostCargo.js
// // import React, { useState } from 'react';

// // function PostCargo() {
// //     const [title, setTitle] = useState('');
// //     const [description, setDescription] = useState('');
// //     const [weight, setWeight] = useState('');
// //     const [isHazardous, setIsHazardous] = useState(false);
// //     const [origin, setOrigin] = useState('');
// //     const [destination, setDestination] = useState('');
// //     const [estimatedPrice, setEstimatedPrice] = useState(null);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
        
// //         // First, post the cargo details to your server
// //         try {
// //             const response = await fetch('http://localhost:5000/api/cargo', {
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     title,
// //                     description,
// //                     weight,
// //                     isHazardous,
// //                     origin,
// //                     destination,
// //                 }),
// //             });

// //             if (!response.ok) throw new Error('Failed to post cargo');

// //             const data = await response.json();
            
// //             // Send details to Flask API for price estimation
// //             const priceResponse = await fetch('http://127.0.0.1:5001/api/predict', {  // Adjust the port if necessary
// //                 method: 'POST',
// //                 headers: {
// //                     'Content-Type': 'application/json',
// //                 },
// //                 body: JSON.stringify({
// //                     origin,
// //                     destination,
// //                     weight
// //                 }),
// //             });

// //             if (!priceResponse.ok) throw new Error('Failed to fetch estimated price');
            
// //             const priceData = await priceResponse.json();
// //             setEstimatedPrice(priceData.estimatedPrice);
// //         } catch (error) {
// //             console.error('Error:', error);
// //         }
// //     };

// //     return (
// //         <div>
// //             <h2>Post Cargo</h2>
// //             <form onSubmit={handleSubmit}>
// //                 <div>
// //                     <label>Title:</label>
// //                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
// //                 </div>
// //                 <div>
// //                     <label>Description:</label>
// //                     <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
// //                 </div>
// //                 <div>
// //                     <label>Weight:</label>
// //                     <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
// //                 </div>
// //                 <div>
// //                     <label>Hazardous:</label>
// //                     <input type="checkbox" checked={isHazardous} onChange={(e) => setIsHazardous(e.target.checked)} />
// //                 </div>
// //                 <div>
// //                     <label>Origin:</label>
// //                     <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
// //                 </div>
// //                 <div>
// //                     <label>Destination:</label>
// //                     <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
// //                 </div>
// //                 <button type="submit">Post Cargo</button>
// //             </form>
// //             {/* {estimatedPrice !== null && ( */}
// //                 <h1>Estimated Price: ${estimatedPrice}</h1>
// //             {/* )} */}
// //         </div>
// //     );
// // }

// // export default PostCargo;

// import React, { useState } from 'react';

// function PostCargo() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [weight, setWeight] = useState('');
//     const [isHazardous, setIsHazardous] = useState(false);
//     const [origin, setOrigin] = useState('');
//     const [destination, setDestination] = useState('');
//     const [estimatedPrice, setEstimatedPrice] = useState(null);
//     const [error, setError] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Post cargo details to your Node server
//             const cargoResponse = await fetch('http://localhost:5000/api/cargo', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ title, description, weight, isHazardous, origin, destination }),
//             });

//             if (!cargoResponse.ok) {
//                 throw new Error('Failed to post cargo');
//             }

//             const cargoData = await cargoResponse.json();

//             // Fetch estimated price from Flask API
//             const priceResponse = await fetch('http://127.0.0.1:5001/api/predict', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     features: [origin, destination, weight],  // Adjust according to your model's expected input
//                 }),
//             });

//             if (!priceResponse.ok) {
//                 throw new Error('Failed to fetch estimated price');
//             }

//             const priceData = await priceResponse.json();
//             setEstimatedPrice(priceData.predictions[0]);  // Adjust according to your API response
//             setError('');
//         } catch (error) {
//             setError(error.message);
//             setEstimatedPrice(null);
//         }
//     };

//     return (
//         <div>
//             <h1>Post Cargo</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Title:
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Weight:
//                     <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Origin:
//                     <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Destination:
//                     <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Hazardous:
//                     <input type="checkbox" checked={isHazardous} onChange={(e) => setIsHazardous(e.target.checked)} />
//                 </label>
//                 <br />
//                 <button type="submit">Post Cargo</button>
//             </form>
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {estimatedPrice !== null && (
//                 <h1>Estimated Price: ${estimatedPrice}</h1>
//             )}
//         </div>
//     );
// }

// export default PostCargo;

// import React, { useState, useEffect } from 'react';

// function PostCargo() {
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [weight, setWeight] = useState('');
//     const [isHazardous, setIsHazardous] = useState(false);
//     const [origin, setOrigin] = useState('');
//     const [destination, setDestination] = useState('');
//     const [estimatedPrice, setEstimatedPrice] = useState(null);
//     const [error, setError] = useState('');
//     const [bids, setBids] = useState([]);
//     const [cargoId, setCargoId] = useState(null); // Store the cargo ID for fetching bids

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             // Post cargo details to your Node server
//             const cargoResponse = await fetch('http://localhost:5000/api/cargo', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ title, description, weight, isHazardous, origin, destination }),
//             });

//             if (!cargoResponse.ok) {
//                 throw new Error('Failed to post cargo');
//             }

//             const cargoData = await cargoResponse.json();
//             setCargoId(cargoData.id); // Assuming the response contains the cargo ID

//             // Fetch estimated price from Flask API
//             const priceResponse = await fetch('http://127.0.0.1:5001/api/predict', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({
//                     features: [origin, destination, weight],  // Adjust according to your model's expected input
//                 }),
//             });

//             if (!priceResponse.ok) {
//                 throw new Error('Failed to fetch estimated price');
//             }

//             const priceData = await priceResponse.json();
//             setEstimatedPrice(priceData.predictions[0]);  // Adjust according to your API response
//             setError('');
            
//             // Fetch bids for the posted cargo
//             fetchBids(cargoData.id);
//         } catch (error) {
//             setError(error.message);
//             setEstimatedPrice(null);
//         }
//     };

//     const fetchBids = async (cargoId) => {
//         try {
//             const bidsResponse = await fetch(`http://localhost:5000/api/bids/${cargoId}`); // Endpoint to fetch bids
//             if (!bidsResponse.ok) {
//                 throw new Error('Failed to fetch bids');
//             }
//             const bidsData = await bidsResponse.json();
//             setBids(bidsData.bids); // Assuming the response contains a list of bids
//         } catch (error) {
//             console.error('Error fetching bids:', error);
//         }
//     };

//     return (
//         <div>
//             <h1>Post Cargo</h1>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Title:
//                     <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Description:
//                     <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Weight:
//                     <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Origin:
//                     <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Destination:
//                     <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
//                 </label>
//                 <br />
//                 <label>
//                     Hazardous:
//                     <input type="checkbox" checked={isHazardous} onChange={(e) => setIsHazardous(e.target.checked)} />
//                 </label>
//                 <br />
//                 <button type="submit">Post Cargo</button>
//             </form>

//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             {estimatedPrice !== null && (
//                 <h1>Estimated Price: ${estimatedPrice}</h1>
//             )}

//             <h2>Bids</h2>
//             {bids.length > 0 ? (
//                 <ul>
//                     {bids.map((bid) => (
//                         <li key={bid.id}>
//                             Company: {bid.companyName} - Bid Amount: ${bid.amount}
//                         </li>
//                     ))}
//                 </ul>
//             ) : (
//                 <p>No bids yet.</p>
//             )}
//         </div>
//     );
// }

// export default PostCargo;

import React, { useState, useEffect } from 'react';

function PostCargo() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [weight, setWeight] = useState('');
    const [isHazardous, setIsHazardous] = useState(false);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [estimatedPrice, setEstimatedPrice] = useState(null);
    const [error, setError] = useState('');
    const [bids, setBids] = useState([]);
    const [cargoId, setCargoId] = useState(null);
    const [timeLeft, setTimeLeft] = useState(0); // Timer state

    useEffect(() => {
        if (cargoId) {
            const interval = setInterval(() => {
                fetchRemainingTime();
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [cargoId]);

    const fetchRemainingTime = async () => {
        try {
            const response = await fetch(`http://localhost:5000/api/cargo/${cargoId}/time`);
            if (!response.ok) throw new Error('Failed to fetch remaining time');
            const { remainingTime } = await response.json();
            setTimeLeft(remainingTime);
        } catch (error) {
            console.error('Error fetching remaining time:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const cargoResponse = await fetch('http://localhost:5000/api/cargo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description, weight, isHazardous, origin, destination }),
            });

            if (!cargoResponse.ok) throw new Error('Failed to post cargo');
            const cargoData = await cargoResponse.json();
            setCargoId(cargoData.id);

            const priceResponse = await fetch('http://127.0.0.1:5001/api/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    features: [origin, destination, weight],
                }),
            });

            if (!priceResponse.ok) throw new Error('Failed to fetch estimated price');
            const priceData = await priceResponse.json();
            setEstimatedPrice(priceData.predictions[0]);
            setError('');

            fetchBids(cargoData.id);
        } catch (error) {
            setError(error.message);
            setEstimatedPrice(null);
        }
    };

    const fetchBids = async (cargoId) => {
    try {
        if (!cargoId) throw new Error('Invalid cargoId');
        const bidsResponse = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
        if (!bidsResponse.ok) throw new Error('Failed to fetch bids');
        const bidsData = await bidsResponse.json();
        setBids(bidsData.bids || []); // Default to empty array if bidsData.bids is undefined
    } catch (error) {
        console.error('Error fetching bids:', error);
        setBids([]); // Clear bids on error
    }
};
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours}h ${minutes}m ${secs}s`;
    };

    return (
        <div>
            <h1>Post Cargo</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
                </label>
                <br />
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <br />
                <label>
                    Weight:
                    <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} required />
                </label>
                <br />
                <label>
                    Origin:
                    <input type="text" value={origin} onChange={(e) => setOrigin(e.target.value)} required />
                </label>
                <br />
                <label>
                    Destination:
                    <input type="text" value={destination} onChange={(e) => setDestination(e.target.value)} required />
                </label>
                <br />
                <label>
                    Hazardous:
                    <input type="checkbox" checked={isHazardous} onChange={(e) => setIsHazardous(e.target.checked)} />
                </label>
                <br />
                <button type="submit">Post Cargo</button>
            </form>

            
            {/* <h2></h2>
            {bids.length > 0 ? (
                <ul>
                    {bids.map((bid) => (
                        <li key={bid.id}>
                            Company: {bid.companyName} - Bid Amount: ${bid.amount}
                        </li>
                    ))}
                </ul>
            ) : (
                <p></p>
            )} */}

            {cargoId && (
                <div>
                    <h2>Time Left for Cargo Posting</h2>
                    <p>{formatTime(timeLeft)}</p>
                </div>
            )}
        </div>
    );
}

export default PostCargo;
