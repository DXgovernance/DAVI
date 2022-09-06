import { BigNumber } from 'ethers';
import { formatUnits } from 'ethers/lib/utils';
import { ChildrenNode, Matcher, MatchResponse, Node } from 'interweave';
import moment from 'moment';
import { FiExternalLink } from 'react-icons/fi';
import { UnstyledLink } from 'components/primitives/Links';
import { FunctionParamWithValue } from 'components/ActionsBuilder/SupportedActions/GenericCall/GenericCallInfoLine';
import { ENSAvatar } from 'components/Avatar';
import { capitalizeFirstLetter } from 'utils';
import { ParamDetail } from 'components/ActionsBuilder/CallDetails/CallDetails.styled';

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
      return (
        <>
          <UnstyledLink to="#">
            <ParamDetail>
              <ENSAvatar address={param.value} size={16} displayEnsOrAddress />{' '}
              <FiExternalLink size={16} />
            </ParamDetail>
          </UnstyledLink>
        </>
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
