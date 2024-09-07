
// import React, { useState, useEffect } from 'react';
// // import PostCargo from './Postcargo'; // Ensure correct import path
// import BidForm from './BidForm';


// function BidCargo() {
//     const [cargoList, setCargoList] = useState([]);
//     const [selectedCargo, setSelectedCargo] = useState(null);

//     useEffect(() => {
//         const fetchCargoList = async () => {
//             try {
//                 const response = await fetch('http://localhost:5000/api/cargo'); // Make sure this URL matches the backend route
//                 if (!response.ok) {
//                     throw new Error('Failed to fetch cargo list');
//                 }
//                 const data = await response.json();
//                 setCargoList(data); // Set the fetched cargo list in the state
//             } catch (error) {
//                 console.error('Error fetching cargo list:', error);
//                 alert('Failed to load cargo list. Please check the server or try again later.');
//             }
//         };
    
//         fetchCargoList();
//     }, []);
    
//     const handleCargoSelect = async (cargoId) => {
//         try {
//             const response = await fetch(`http://localhost:5000/api/cargo/${cargoId}`); // Correct URL
//             if (!response.ok) {
//                 throw new Error('Failed to fetch cargo details');
//             }
//             const data = await response.json();
//             setSelectedCargo(data);
//         } catch (error) {
//             console.error('Error fetching cargo details:', error);
//             alert('Failed to load cargo details. Please check the server or try again later.');
//         }
//     };

//     return (
        
//                     <div>
//                         <h1>Welcome to the Tender System</h1>
                        
//                         <div>
//                             <h2>Posted Cargo</h2>
//                             <ul>
//                                 {cargoList.length > 0 ? (
//                                     cargoList.map(cargo => (
//                                         <li key={cargo._id}>
//                                             <h3>{cargo.title}</h3>
//                                             <p>{cargo.description}</p>
//                                             <p>Weight: {cargo.weight}</p>
//                                             <p>Hazardous: {cargo.isHazardous ? 'Yes' : 'No'}</p>
//                                             <button onClick={() => handleCargoSelect(cargo._id)}>
//                                                 View and Bid
//                                             </button>
//                                         </li>
//                                     ))
//                                 ) : (
//                                     <p>No cargo available</p>
//                                 )}
//                             </ul>
//                         </div>
//                         {selectedCargo && (
//                             <div>
//                                 <h2>Place a Bid for {selectedCargo.title}</h2>
//                                 <BidForm cargoId={selectedCargo._id} />
//                                 <h2>Bids</h2>
//                                 <BidsList cargoId={selectedCargo._id} />
//                             </div>
//                         )}
//                     </div>
                
//     );
// }

// function BidsList({ cargoId }) {
//     const [bids, setBids] = useState([]);

//     useEffect(() => {
//         const fetchBids = async () => {
//             try {
//                 const response = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
//                 if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
//                 const data = await response.json();
//                 console.log('Bids List:', data);  // Debugging line
//                 setBids(data);
//             } catch (error) {
//                 console.error('Error fetching bids:', error);
//                 alert('Failed to load bids');
//             }
//         };

//         fetchBids();
//     }, [cargoId]);

//     return (
//         <ul>
//             {bids.map(bid => (
//                 <li key={bid._id}>
//                     {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.bidDate).toLocaleDateString()})
//                 </li>
//             ))}
//         </ul>
//     );
// }

// export default BidCargo;

import React, { useState, useEffect } from 'react';
// import PostCargo from './Postcargo'; // Ensure correct import path
import BidForm from './BidForm';

function BidCargo() {
    const [cargoList, setCargoList] = useState([]);
    const [selectedCargo, setSelectedCargo] = useState(null);

    useEffect(() => {
        const fetchCargoList = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/cargo'); // Ensure this URL matches the backend route
                if (!response.ok) {
                    throw new Error('Failed to fetch cargo list');
                }
                const data = await response.json();
                setCargoList(data); // Set the fetched cargo list in the state
            } catch (error) {
                console.error('Error fetching cargo list:', error);
                alert('Failed to load cargo list. Please check the server or try again later.');
            }
        };
    
        fetchCargoList();
    }, []);
    
    const handleCargoSelect = async (cargoId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cargo/${cargoId}`); // Correct URL
            if (!response.ok) {
                throw new Error('Failed to fetch cargo details');
            }
            const data = await response.json();
            setSelectedCargo(data);
        } catch (error) {
            console.error('Error fetching cargo details:', error);
            alert('Failed to load cargo details. Please check the server or try again later.');
        }
    };

    return (
        <div>
            <h1>Welcome to the Tender System</h1>
            
            <div>
                <h2>Posted Cargo</h2>
                <ul>
                    {cargoList.length > 0 ? (
                        cargoList.map(cargo => (
                            <li key={cargo._id}>
                                <h3>{cargo.title}</h3>
                                <p>{cargo.description}</p>
                                <p>Weight: {cargo.weight}</p>
                                <p>Hazardous: {cargo.isHazardous ? 'Yes' : 'No'}</p>
                                <p>Estimated Price: ${cargo.estimatedPrice}</p> {/* Display the estimated price */}
                                <button onClick={() => handleCargoSelect(cargo._id)}>
                                    View and Bid
                                </button>
                            </li>
                        ))
                    ) : (
                        <p>No cargo available</p>
                    )}
                </ul>
            </div>
            
            {selectedCargo && (
                <div>
                    <h2>Place a Bid for {selectedCargo.title}</h2>
                    <BidForm cargoId={selectedCargo._id} />
                    <h2>Bids</h2>
                    <BidsList cargoId={selectedCargo._id} />
                </div>
            )}
        </div>
    );
}

function BidsList({ cargoId }) {
    const [bids, setBids] = useState([]);

    useEffect(() => {
        const fetchBids = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/bids/${cargoId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                console.log('Bids List:', data);  // Debugging line
                setBids(data);
            } catch (error) {
                console.error('Error fetching bids:', error);
                alert('Failed to load bids');
            }
        };

        fetchBids();
    }, [cargoId]);

    return (
        <ul>
            {bids.map(bid => (
                <li key={bid._id}>
                    {bid.companyName}: ${bid.bidAmount} (Bid Date: {new Date(bid.bidDate).toLocaleDateString()})
                </li>
            ))}
        </ul>
    );
}

export default BidCargo;
