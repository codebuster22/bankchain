pragma solidity ^0.6.0;

import "./AssetManager.sol";

contract AssetInterface{

    enum assetState{Created, onAuction, Auctioned}

    assetState state;
    uint NPA_ID;
    string assetOnAuction;
    string bankName;
    uint auctionID;
    uint eventType;
    string city;
    uint reservePrice;
    uint EMD;
    uint bidMultipliers;
    uint timeStamp;

    AssetManager assetManager;

    constructor(
        AssetManager _parent,
        uint _NPA_ID,
        string memory _assetOnAuction,
        string memory _bankName, uint _auctionID, uint _eventType,
        string memory _city,
        uint _reservePrice, uint _EMD, uint _bidMultipliers,uint _timeStamp) public{
        assetManager = _parent;
        NPA_ID = _NPA_ID;
        assetOnAuction = _assetOnAuction;
        bankName=_bankName;
        auctionID=_auctionID;
        eventType = _eventType;
        city=_city;
        reservePrice=_reservePrice;
        EMD=_EMD;
        bidMultipliers=_bidMultipliers;
        timeStamp=_timeStamp;
        state = assetState.Created;
    }

    function getNPADetails() public view returns(uint _NPA_ID, string memory _assetOnAuction, string memory _bankName, uint _auctionID, uint _eventType, string memory _city, uint _reservePrice, uint _EMD, uint _bidMultipliers, uint _timeStamp){
        return (NPA_ID, assetOnAuction, bankName, auctionID, eventType, city, reservePrice, EMD, bidMultipliers, timeStamp);
    }
}