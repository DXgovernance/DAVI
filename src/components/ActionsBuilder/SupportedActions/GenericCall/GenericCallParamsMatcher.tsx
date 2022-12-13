import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { ChildrenNode, Matcher, MatchResponse, Node } from 'interweave';
import moment from 'moment';
import { BlockExplorerLink } from 'components/primitives/Links';
import { FunctionParamWithValue } from 'components/ActionsBuilder/SupportedActions/GenericCall/GenericCallInfoLine';
import { capitalizeFirstLetter } from 'utils';
interface MatcherOptions {
  params: FunctionParamWithValue[];
}

interface MatchResult {
  matchedParam: string;
}

export const renderGenericCallParamValue = (
  param: Partial<FunctionParamWithValue>
) => {
  if (!param) return null;

  switch (param.component) {
    case 'address':
    case 'tokenPicker':
      return (
        <BlockExplorerLink
          address={param.value}
          showAvatar
          shortAddress
          avatarSize={16}
        />
      );
    case 'integer':
    case 'decimal':
      const bn = BigNumber.from(param.value);
      return bn.toString();
    case 'date':
      return `${moment.unix(Number(param.value)).utc().format('LLLL')} UTC`;
    case 'duration':
    case 'time':
      return capitalizeFirstLetter(
        moment.duration(Number(param.value), 'seconds').humanize()
      );
    case 'boolean':
      return `${param.value}`;
    case 'tokenAmount':
      // TODO: Handle number of decimals better
      const number = BigNumber.from(param.value);
      let formatted = Number.parseFloat(formatUnits(number, 18));
      return Math.round(formatted * Math.pow(10, 4)) / Math.pow(10, 4);
    case 'contentHash':
    default:
      return param.value;
  }
};

class GenericCallParamsMatcher extends Matcher<{}, MatcherOptions> {
  renderByParamType(param: FunctionParamWithValue) {
    return renderGenericCallParamValue(param);
  }

  match(string: string): MatchResponse<MatchResult> | null {
    const result = string.match(/\$\{([^}]+)\}/);

    if (!result) {
      return null;
    }

    return {
      index: result.index!,
      length: result[0].length,
      match: result[0],
      valid: true,
      matchedParam: result[1],
    };
  }

  replaceWith(_: ChildrenNode, props: MatchResult): Node {
    const paramName = props.matchedParam;
    const param = this.options.params?.find(param => param.name === paramName);

    return (
      <span style={{ display: 'inline-block' }} {...props}>
        {this.renderByParamType(param)}
      </span>
    );
  }

  asTag(): string {
    return 'span';
  }
}

export default GenericCallParamsMatcher;
