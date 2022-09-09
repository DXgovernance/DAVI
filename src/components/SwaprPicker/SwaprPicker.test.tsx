import { fireEvent, waitFor } from '@testing-library/react';
import { useState } from 'react';
import { render } from 'utils/tests';
import SwaprPicker from './SwaprPicker';

let fullResponse = [
  [
    {
      address: '0x003aac027e76aba3b7805a038daa53e1a0f16c1b',
      reserve0: '0.043980891140167725',
      reserve1: '0.478300853534054223',
      reserveUSD: '0',
      reserveNativeCurrency: '0',
      totalSupply: '0.144946043145007925',
      token0: {
        address: '0x3c8a8bca34d24aa194bfd15ea7a9be1fb2988e38',
        name: 'xDOGE',
        symbol: 'XDOGE',
        decimals: '18',
      },
      token1: {
        address: '0xed8262aae24b6093d08a01dbbd28027df3fdd778',
        name: 'DON Token',
        symbol: 'DON',
        decimals: '18',
      },
      liquidityMiningCampaigns: [],
    },
  ],
  null,
];

jest.mock('hooks/Guilds/useSwaprFetchPairs', () => ({
  __esModule: true,
  useSwaprFetchPairs: () => Promise.resolve(fullResponse),
}));

jest.mock('hooks/Guilds/ens/useENSAvatar', () => ({
  __esModule: true,
  default: () => ({
    avatarUri: 'test',
    imageUrl: 'test',
    ensName: 'test.eth',
  }),
}));

const mockChainId = 123456;
jest.mock('wagmi', () => ({
  useNetwork: () => ({ chain: { id: mockChainId } }),
}));

console.error = jest.fn();

const Wrapper = () => {
  const [value, setValue] = useState('');
  const onChange = (e: string) => {
    setValue(e);
  };
  return <SwaprPicker value={value} onChange={onChange} />;
};

describe('SwaprPicker', () => {
  it('should render the options', async () => {
    let result = await waitFor(() => render(<Wrapper />));

    const swaprPickerButton = await waitFor(() =>
      result.getByLabelText('Swapr picker button')
    );
    fireEvent.click(swaprPickerButton);

    const optionOne = await waitFor(() => result.getByText('XDOGE - DON'));
    expect(optionOne).toBeInTheDocument();
  });

  it('should show an address button with the address value when an option is selected', async () => {
    let result = await waitFor(() => render(<Wrapper />));

    const swaprPickerButton = await waitFor(() =>
      result.getByLabelText('Swapr picker button')
    );
    fireEvent.click(swaprPickerButton);

    const optionOne = await waitFor(() => result.getByText('XDOGE - DON'));
    fireEvent.click(optionOne);

    const addressButton = await waitFor(() => result.getByText('test.eth'));

    expect(addressButton).toBeInTheDocument();
  });
});
