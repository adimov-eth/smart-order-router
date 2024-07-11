"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaticV3SubgraphProvider = void 0;
/* eslint-disable @typescript-eslint/no-non-null-assertion */
const sdk_core_1 = require("@uniswap/sdk-core");
const v3_sdk_1 = require("@uniswap/v3-sdk");
const jsbi_1 = __importDefault(require("jsbi"));
const lodash_1 = __importDefault(require("lodash"));
const amounts_1 = require("../../util/amounts");
const chains_1 = require("../../util/chains");
const log_1 = require("../../util/log");
const token_provider_1 = require("../token-provider");
const BASES_TO_CHECK_TRADES_AGAINST = {
    [sdk_core_1.ChainId.MAINNET]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.MAINNET],
        token_provider_1.DAI_MAINNET,
        token_provider_1.USDC_MAINNET,
        token_provider_1.USDT_MAINNET,
        token_provider_1.WBTC_MAINNET,
    ],
    [sdk_core_1.ChainId.AURORIA]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.AURORIA], token_provider_1.DAI_AURORIA],
    [sdk_core_1.ChainId.GOERLI]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.GOERLI],
        token_provider_1.USDT_GOERLI,
        token_provider_1.USDC_GOERLI,
        token_provider_1.WBTC_GOERLI,
        token_provider_1.DAI_GOERLI,
    ],
    [sdk_core_1.ChainId.SEPOLIA]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.SEPOLIA], token_provider_1.USDC_SEPOLIA],
    [sdk_core_1.ChainId.OPTIMISM]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.OPTIMISM],
        token_provider_1.USDC_OPTIMISM,
        token_provider_1.DAI_OPTIMISM,
        token_provider_1.USDT_OPTIMISM,
        token_provider_1.WBTC_OPTIMISM,
        token_provider_1.OP_OPTIMISM,
    ],
    // todo: once subgraph is created
    [sdk_core_1.ChainId.OPTIMISM_SEPOLIA]: [
    //   WRAPPED_NATIVE_CURRENCY[ChainId.OPTIMISM_SEPOLIA]!,
    ],
    [sdk_core_1.ChainId.ARBITRUM_ONE]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ARBITRUM_ONE],
        token_provider_1.WBTC_ARBITRUM,
        token_provider_1.DAI_ARBITRUM,
        token_provider_1.USDC_ARBITRUM,
        token_provider_1.USDT_ARBITRUM,
        token_provider_1.ARB_ARBITRUM,
    ],
    [sdk_core_1.ChainId.ARBITRUM_GOERLI]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ARBITRUM_GOERLI],
        token_provider_1.USDC_ARBITRUM_GOERLI,
    ],
    [sdk_core_1.ChainId.ARBITRUM_SEPOLIA]: [
    // WRAPPED_NATIVE_CURRENCY[ChainId.ARBITRUM_SEPOLIA]!,
    ],
    [sdk_core_1.ChainId.OPTIMISM_GOERLI]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.OPTIMISM_GOERLI],
        token_provider_1.USDC_OPTIMISM_GOERLI,
        token_provider_1.DAI_OPTIMISM_GOERLI,
        token_provider_1.USDT_OPTIMISM_GOERLI,
        token_provider_1.WBTC_OPTIMISM_GOERLI,
    ],
    [sdk_core_1.ChainId.POLYGON]: [token_provider_1.USDC_POLYGON, token_provider_1.WETH_POLYGON, token_provider_1.WMATIC_POLYGON],
    [sdk_core_1.ChainId.POLYGON_MUMBAI]: [
        token_provider_1.DAI_POLYGON_MUMBAI,
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.POLYGON_MUMBAI],
        token_provider_1.WMATIC_POLYGON_MUMBAI,
    ],
    [sdk_core_1.ChainId.CELO]: [token_provider_1.CELO, token_provider_1.CUSD_CELO, token_provider_1.CEUR_CELO, token_provider_1.DAI_CELO],
    [sdk_core_1.ChainId.CELO_ALFAJORES]: [
        token_provider_1.CELO_ALFAJORES,
        token_provider_1.CUSD_CELO_ALFAJORES,
        token_provider_1.CEUR_CELO_ALFAJORES,
        token_provider_1.DAI_CELO_ALFAJORES,
    ],
    [sdk_core_1.ChainId.GNOSIS]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.GNOSIS],
        token_provider_1.WBTC_GNOSIS,
        token_provider_1.WXDAI_GNOSIS,
        token_provider_1.USDC_ETHEREUM_GNOSIS,
    ],
    [sdk_core_1.ChainId.BNB]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.BNB],
        token_provider_1.BUSD_BNB,
        token_provider_1.DAI_BNB,
        token_provider_1.USDC_BNB,
        token_provider_1.USDT_BNB,
        token_provider_1.BTC_BNB,
        token_provider_1.ETH_BNB,
    ],
    [sdk_core_1.ChainId.AVALANCHE]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.AVALANCHE],
        token_provider_1.USDC_AVAX,
        token_provider_1.DAI_AVAX,
    ],
    [sdk_core_1.ChainId.MOONBEAM]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.MOONBEAM],
        token_provider_1.DAI_MOONBEAM,
        token_provider_1.USDC_MOONBEAM,
        token_provider_1.WBTC_MOONBEAM,
    ],
    [sdk_core_1.ChainId.BASE_GOERLI]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.BASE_GOERLI]],
    [sdk_core_1.ChainId.BASE]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.BASE], token_provider_1.USDC_BASE],
    [sdk_core_1.ChainId.ZORA]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ZORA]],
    [sdk_core_1.ChainId.ZORA_SEPOLIA]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ZORA_SEPOLIA]],
    [sdk_core_1.ChainId.ROOTSTOCK]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ROOTSTOCK]],
    [sdk_core_1.ChainId.BLAST]: [chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.BLAST], token_provider_1.USDB_BLAST],
    [sdk_core_1.ChainId.ZKSYNC]: [
        chains_1.WRAPPED_NATIVE_CURRENCY[sdk_core_1.ChainId.ZKSYNC],
        token_provider_1.USDCE_ZKSYNC,
        token_provider_1.USDC_ZKSYNC,
    ],
};
/**
 * Provider that uses a hardcoded list of V3 pools to generate a list of subgraph pools.
 *
 * Since the pools are hardcoded and the data does not come from the Subgraph, the TVL values
 * are dummys and should not be depended on.
 *
 * Useful for instances where other data sources are unavailable. E.g. Subgraph not available.
 *
 * @export
 * @class StaticV3SubgraphProvider
 */
class StaticV3SubgraphProvider {
    constructor(chainId, poolProvider) {
        this.chainId = chainId;
        this.poolProvider = poolProvider;
    }
    async getPools(tokenIn, tokenOut, providerConfig) {
        log_1.log.info('In static subgraph provider for V3');
        const bases = BASES_TO_CHECK_TRADES_AGAINST[this.chainId];
        const basePairs = lodash_1.default.flatMap(bases, (base) => bases.map((otherBase) => [base, otherBase]));
        if (tokenIn && tokenOut) {
            basePairs.push([tokenIn, tokenOut], ...bases.map((base) => [tokenIn, base]), ...bases.map((base) => [tokenOut, base]));
        }
        const pairs = (0, lodash_1.default)(basePairs)
            .filter((tokens) => Boolean(tokens[0] && tokens[1]))
            .filter(([tokenA, tokenB]) => tokenA.address !== tokenB.address && !tokenA.equals(tokenB))
            .flatMap(([tokenA, tokenB]) => {
            return [
                [tokenA, tokenB, v3_sdk_1.FeeAmount.LOWEST],
                [tokenA, tokenB, v3_sdk_1.FeeAmount.LOW],
                [tokenA, tokenB, v3_sdk_1.FeeAmount.MEDIUM],
                [tokenA, tokenB, v3_sdk_1.FeeAmount.HIGH],
            ];
        })
            .value();
        log_1.log.info(`V3 Static subgraph provider about to get ${pairs.length} pools on-chain`);
        const poolAccessor = await this.poolProvider.getPools(pairs, providerConfig);
        const pools = poolAccessor.getAllPools();
        const poolAddressSet = new Set();
        const subgraphPools = (0, lodash_1.default)(pools)
            .map((pool) => {
            const { token0, token1, fee, liquidity } = pool;
            const poolAddress = v3_sdk_1.Pool.getAddress(pool.token0, pool.token1, pool.fee);
            if (poolAddressSet.has(poolAddress)) {
                return undefined;
            }
            poolAddressSet.add(poolAddress);
            const liquidityNumber = jsbi_1.default.toNumber(liquidity);
            return {
                id: poolAddress,
                feeTier: (0, amounts_1.unparseFeeAmount)(fee),
                liquidity: liquidity.toString(),
                token0: {
                    id: token0.address,
                },
                token1: {
                    id: token1.address,
                },
                // As a very rough proxy we just use liquidity for TVL.
                tvlETH: liquidityNumber,
                tvlUSD: liquidityNumber,
            };
        })
            .compact()
            .value();
        return subgraphPools;
    }
}
exports.StaticV3SubgraphProvider = StaticV3SubgraphProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGljLXN1YmdyYXBoLXByb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL3Byb3ZpZGVycy92My9zdGF0aWMtc3ViZ3JhcGgtcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNkRBQTZEO0FBQzdELGdEQUFtRDtBQUNuRCw0Q0FBa0Q7QUFDbEQsZ0RBQXdCO0FBQ3hCLG9EQUF1QjtBQUV2QixnREFBc0Q7QUFDdEQsOENBQTREO0FBQzVELHdDQUFxQztBQUVyQyxzREF5RDJCO0FBUzNCLE1BQU0sNkJBQTZCLEdBQW1CO0lBQ3BELENBQUMsa0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNqQixnQ0FBdUIsQ0FBQyxrQkFBTyxDQUFDLE9BQU8sQ0FBRTtRQUN6Qyw0QkFBVztRQUNYLDZCQUFZO1FBQ1osNkJBQVk7UUFDWiw2QkFBWTtLQUNiO0lBQ0QsQ0FBQyxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQXVCLENBQUMsa0JBQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSw0QkFBVyxDQUFDO0lBQzFFLENBQUMsa0JBQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUNoQixnQ0FBdUIsQ0FBQyxrQkFBTyxDQUFDLE1BQU0sQ0FBRTtRQUN4Qyw0QkFBVztRQUNYLDRCQUFXO1FBQ1gsNEJBQVc7UUFDWCwyQkFBVTtLQUNYO0lBQ0QsQ0FBQyxrQkFBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsZ0NBQXVCLENBQUMsa0JBQU8sQ0FBQyxPQUFPLENBQUUsRUFBRSw2QkFBWSxDQUFDO0lBQzVFLENBQUMsa0JBQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUNsQixnQ0FBdUIsQ0FBQyxrQkFBTyxDQUFDLFFBQVEsQ0FBRTtRQUMxQyw4QkFBYTtRQUNiLDZCQUFZO1FBQ1osOEJBQWE7UUFDYiw4QkFBYTtRQUNiLDRCQUFXO0tBQ1o7SUFDRCxpQ0FBaUM7SUFDakMsQ0FBQyxr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