pragma solidity ^0.6.0;

// Import AssetInterface contract to create instance of a NPA
import "./AssetInterface.sol";

// Import Ownable contract by OpenZeppelin to make only Owner access for various functions
import "./Ownable.sol";

contract AssetManager is Ownable{

    //****-----Start of variable declaration-----****//

    enum EventType{EntityAdded,NPA_Created}

    //Mapping of different banks with index starting from 100
    mapping(uint=>string) public bankList;
    uint bankListIndex = 100;

    //Mapping of different sectors with index starting from 200
    mapping(uint=>uint) public auctionList;
    uint auctionIndex = 200;

    //    Mapping of different eventType with index starting from 300
    mapping(uint=>string) eventTypes;
    uint eventIndex=300;

    //Structure to store the NPA contract instance and address of that instance for further interaction
    struct S_NPA
    {
        AssetInterface npa;
        address npaContract;

    }
    //Mapping of different NPA structures with index starting from 400
    mapping(uint=>S_NPA) public NPA_List;
    uint NPA_ListIndex=400;

    //Event to generate LOG of the NPA instance and it's address
    event eventState(string state,uint stateCode,uint id,string name,address npaAddress);

    event npaAddress(uint id, address npa);

    //****-----End of variable declaration-----****//

    // Add Bank function which first checks if the bank is already initialized or not, if initialized returns ID of that bank else emit event added
//    function addBankIfNotExist(string memory _bankName) public onlyOwner returns(uint id){
//        uint bankID = 0;
//        bool bankExist = false;
//        for(uint i = 100; i<bankListIndex; i++){
//            if(keccak256(abi.encodePacked((_bankName))) == keccak256(abi.encodePacked(bankList[i]))){
//                bankID=i;
//                bankExist=true;
//                break;
//            }
//        }
//        if(!bankExist){
//            bankID=bankListIndex;
//            bankList[bankListIndex]=_bankName;
//            emit eventState("Entity Added",uint(EventType.EntityAdded),bankListIndex,_bankName, address(0));
//            bankListIndex++;
//        }
//        return bankID;
//    }

    function addBankIfNotExist(string memory _bankName) public onlyOwner {
        bool bankExist = false;
        for(uint i = 100; i<bankListIndex; i++){
            if(keccak256(abi.encodePacked((_bankName))) == keccak256(abi.encodePacked(bankList[i]))){
                bankExist=true;
                break;
            }
        }
        if(!bankExist){
            bankList[bankListIndex]=_bankName;
            emit eventState("Entity Added",uint(EventType.EntityAdded),bankListIndex,_bankName, address(0));
            bankListIndex++;
        }
    }


    function getNPA(uint _id) view public returns(uint id, address add){
        address npa =  NPA_List[_id].npaContract;
        return (_id,npa);
    }

    // Add Sector function which first checks if the bank is already initialized or not, if initialized returns ID of that bank else emit event added
    function addAuctionIdIfNotExist(uint _auctionID) public onlyOwner returns(uint){
        uint auctionId;
        bool auctionExist=false;
        for(uint j = 200; j<auctionIndex; j++){
            if(auctionList[j]==_auctionID){
                auctionId=j;
                auctionExist=true;
                break;
            }
        }
        if(!auctionExist){
            auctionId=auctionIndex;
            auctionList[auctionIndex]=_auctionID;
            emit eventState("Entity Added",uint(EventType.EntityAdded),auctionIndex,"Success", address(0));
            auctionIndex++;
        }
        return auctionId;
    }
    //
    //      Add Borrower function which first checks if the bank is already initialized or not, if initialized returns ID of that bank else emit event added
    function addEventTypeIfNotExist(string memory _eventName) public onlyOwner returns(uint){
        uint eventId;
        bool eventExist=false;
        for(uint k = 300; k<eventIndex; k++){
            if(keccak256(abi.encodePacked((_eventName))) == keccak256(abi.encodePacked(eventTypes[k]))){
                eventId=k;
                eventExist=true;
                break;
            }
        }
        if(!eventExist){
            eventTypes[eventIndex]=_eventName;
            eventId=eventIndex;
            emit eventState("Entity Added",uint(EventType.EntityAdded),eventIndex,_eventName,address(0));
            eventIndex++;
        }
        return eventId;
    }

    function addNPA(string memory _bankName,string memory _assetOnAuction,uint _auctionID, string memory _eventType, string memory _city,
        uint _reservePrice,uint _EMD,uint _bidMultiplier, uint _timestamp) public onlyOwner{

        if(addAuctionIdIfNotExist(_auctionID)<auctionIndex){
            emit eventState("Already exist",uint(EventType.NPA_Created),NPA_ListIndex,"_borrowerName", address(0));
        }else{

            //  Creating AssetInterface contract of a NPA
            AssetInterface item = new AssetInterface(this, NPA_ListIndex, _assetOnAuction,
                _bankName, addAuctionIdIfNotExist(_auctionID), addEventTypeIfNotExist(_eventType),
                _city, _reservePrice, _EMD, _bidMultiplier, _timestamp);
            // Adding the NPA and address of that NPA to Structure
            NPA_List[NPA_ListIndex].npaContract = address(item);
            NPA_List[NPA_ListIndex].npa = item;
            emit eventState("NPA Created",uint(EventType.NPA_Created),NPA_ListIndex,"_borrowerName", address(item));
        }
        NPA_ListIndex++;

    }
}