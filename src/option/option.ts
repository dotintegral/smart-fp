import { getHelpers, ValueValidator, defaultValidator } from './helpers';
import { getMap } from './operators/map';
import { getFlatMap } from './operators/flatMap';
import { getAp } from './operators/ap';
import { getAlt } from './operators/alt';
import { getFold } from './operators/fold';
import { getBimap } from './operators/bimap';
import { getMapReason } from './operators/mapReason';
import { getFilter } from './operators/filter';
import { getTap } from './operators/tap';
import { getBitap } from './operators/bitap';
import { getTapReason } from './operators/tapReason';
import { getFlatten } from './operators/flatten';
import { getCombine } from './operators/combine';
import { getChain } from './operators/chain';

export { ValueValidator, None, Some, Option } from './helpers';

export const createOption = (validator: ValueValidator) => {
  const helpers = getHelpers(validator);

  const defaultOption = {
    // creators
    none: helpers.none,
    some: helpers.some,
    create: helpers.create,
    combine: getCombine(helpers),

    // helpers
    isSome: helpers.isSome,
    isNone: helpers.isNone,

    // operators
    map: getMap(helpers),
    flatMap: getFlatMap(helpers),
    ap: getAp(helpers),
    alt: getAlt(helpers),
    fold: getFold(helpers),
    bimap: getBimap(helpers),
    mapReason: getMapReason(helpers),
    filter: getFilter(helpers),
    tap: getTap(helpers),
    bitap: getBitap(helpers),
    tapReason: getTapReason(helpers),
    flatten: getFlatten(helpers),
    chain: getChain(helpers),
  };

  return defaultOption;
};

export default createOption(defaultValidator);
