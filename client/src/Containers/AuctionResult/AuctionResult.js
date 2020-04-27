import React from "react";
import Table from "react-bootstrap/Table";

//Accepts array of NPA Structure
const AuctionResult = ({npa}) => {
    const rows = npa.map(({_auctionID,_bankName,_assetOnAuction,_city,_timeStamp,_reservePrice,_EMD,_bidMultipliers,_eventType})=>{
        const _date= new Date(_timeStamp*1000);
        return (<tr key={_auctionID}>
            <td>{_auctionID}</td>
            <td>{_bankName}</td>
            <td>{_assetOnAuction}</td>
            <td>{_city}</td>
            <td>{_date.toDateString()}</td>
            <td>{_reservePrice}</td>
            <td>{_EMD}</td>
            <td>{_bidMultipliers}</td>
            <td>{_eventType}</td>
        </tr>)});
    return (
        <div className={'w-80 bg-white shadow-5 br-m mt-3'}>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>Auction ID</th>
                    <th>Bank Name</th>
                    <th>Asset On Auction</th>
                    <th>City</th>
                    <th>Date</th>
                    <th>Reserve Price</th>
                    <th>EMD</th>
                    <th>Bid Multiplier</th>
                    <th>Event Type</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </Table>
        </div>
    )
}

export default AuctionResult;