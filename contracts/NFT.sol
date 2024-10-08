// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GodOfDecisionNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIdCounter;

    // Constant metadata URI for the image and other static data
    string private constant baseURI = "https://ipfs.io/ipfs/";

    // Mapping to track token ownership manually
    mapping(uint256 => address) private _tokenOwners;

    constructor() ERC721("God of Decision NFT", "GODNFT") {
        // Constructor code if needed
    }

    function mintNFT(string memory CID) public {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();

        // Mint the NFT (this already tracks ownership internally)
        _safeMint(msg.sender, tokenId);

        // Combine baseURI with CID to form the final URI
        string memory tokenURI = string(abi.encodePacked(baseURI, CID));

        // Set the token URI
        _setTokenURI(tokenId, tokenURI);
    }
}
