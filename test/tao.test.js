const { expect } = require('chai');

// Load compiled artifacts
const Tao = artifacts.require('Tao');

// Start test block
contract('Tao', function () {
  beforeEach(async function () {
    // Deploy a new Box contract for each test
    this.tao = await Tao.new();
  });

  // Test case
  it('Pusing transactions', async function () {
    // Store a value
    await this.tao.pause();

    // Test if the returned value is the same one
    // Note that we need to use strings to compare the 256 bit integers
  });
});