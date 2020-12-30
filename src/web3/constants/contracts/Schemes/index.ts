import SCHEME_MANAGER from '@app/web3/constants/contracts/json/SchemeManager.json';
import SCROUNGE_FOR_SATOCHIS from '@app/web3/constants/contracts/json/ScroungeForSatochis.json';
import YIELD_FARM from '@app/web3/constants/contracts/json/YieldFarm.json';
import BASE_SCHEME from './BaseScheme.json';

const SCHEME_MANAGER_ADDRESS = SCHEME_MANAGER.address;
const SCHEME_MANAGER_ABI = SCHEME_MANAGER.abi;

const SCROUNGE_FOR_SATOCHIS_ADDRESS = SCROUNGE_FOR_SATOCHIS.address;
const SCROUNGE_FOR_SATOCHIS_ABI = SCROUNGE_FOR_SATOCHIS.abi;

const YIELD_FARM_ADDRESS = YIELD_FARM.address;
const YIELD_FARM_ABI = YIELD_FARM.abi;

const BASE_SCHEME_ABI = BASE_SCHEME.abi;

export {
    SCHEME_MANAGER_ADDRESS,
    SCROUNGE_FOR_SATOCHIS_ADDRESS,
    YIELD_FARM_ADDRESS,
    SCHEME_MANAGER_ABI,
    SCROUNGE_FOR_SATOCHIS_ABI,
    YIELD_FARM_ABI,
    BASE_SCHEME_ABI,
};
