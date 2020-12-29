import PLAYER from '../json/Player.json';
import PLAYER_STATS from '../json/PlayerStats.json';
import TREASURY from '../json/Treasury.json';

const PLAYER_ABI = PLAYER.abi;
const PLAYER_ADDRESS = PLAYER.address;

const PLAYER_STATS_ABI = PLAYER_STATS.abi;
const PLAYER_STATS_ADDRESS = PLAYER_STATS.address;

const TREASURY_ABI = TREASURY.abi;
const TREASURY_ADDRESS = TREASURY.address;

export { PLAYER_ADDRESS, PLAYER_STATS_ADDRESS, PLAYER_STATS_ABI, PLAYER_ABI, TREASURY_ABI, TREASURY_ADDRESS };
