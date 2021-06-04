// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Librerias de openzeppelin
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/*
El contrato hereda: 
ERC20: Interfaz del ERC20 standar
Burnable: Permite quemar tokens 
Pausable: Nos permite pausar las transferencias, minting y quemado de los tokens
AccessControl: Nos permite la creación de roles
*/
contract Love is ERC20, ERC20Burnable, Pausable, AccessControl {
    // Creación de Roles: PAUSER_ROLE y MINTER_ROLE 
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    // Nombre y símbolo del token
    constructor() ERC20("Love", "LOVE") {
        // Consede el rol de admin, pauser y minter al deployer del contrato
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _setupRole(PAUSER_ROLE, msg.sender);
        // Pre-mint de 5000 tokens para el dueño del contrato
        _mint(msg.sender, 5000 * 10 ** decimals());
        _setupRole(MINTER_ROLE, msg.sender);
    }

    // Pausamos las transferecias, requiere tener el rol de pauser
    function pause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _pause();
    }

    // Quitamos la pausa de transferencias, requiere el rol de pauser
    function unpause() public {
        require(hasRole(PAUSER_ROLE, msg.sender));
        _unpause();
    }

    // Acuñado de tokens a una address, requiere el rol de minter
    function mint(address to, uint256 amount) public {
        require(hasRole(MINTER_ROLE, msg.sender));
        _mint(to, amount);
    }

    // Permitimos las transferecias solo si el contrato no esta pausado
    function _beforeTokenTransfer(address from, address to, uint256 amount)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, amount);
    }
}

