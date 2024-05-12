// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// ERC20 token contract
contract MyToken {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 public totalSupply;
    
    mapping (address => uint256) public balanceOf;
    mapping (address => mapping (address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(uint256 initialSupply, string memory _name, string memory _symbol, uint8 _decimals) {
        balanceOf[msg.sender] = initialSupply;
        totalSupply = initialSupply;
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value);
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }
    
    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }
    
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[_from] >= _value);
        require(allowance[_from][msg.sender] >= _value);
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
/*


pragma solidity ^0.8.0;

contract SimpleEthereumTransfer {
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    
    function transferEther(address payable _to) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        _to.transfer(msg.value);
        emit Transfer(msg.sender, _to, msg.value);
    }
}
*/