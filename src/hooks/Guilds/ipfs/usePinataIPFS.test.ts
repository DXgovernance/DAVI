import usePinataIPFS from './usePinataIPFS';

jest.mock('Modules/Guilds/Hooks/useTypedParams', () => ({
  useTypedParams: () => ({
    chainName: 'localhost',
    guildId: '0xE9bDaB08f2FBb370d2a6F6661a92d9B6157E9fd2',
  }),
}));

describe('usePinataIPFS', () => {
  it('should return file data after successfully pinning JSON content', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ success: true }),
        })
      ) as jest.Mock
    );
    const { pinToPinata } = usePinataIPFS();
    const data = { description: 'some proposal' };
    let pinResult = await pinToPinata('someHash', data);

    expect(pinResult.success).toBeTruthy();
  });

  it('should return file data after successfully pinning by hash', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          status: 200,
          json: () => Promise.resolve({ success: true }),
        })
      ) as jest.Mock
    );
    const { pinToPinata } = usePinataIPFS();
    let pinResult = await pinToPinata('someHash');

    expect(pinResult.success).toBeTruthy();
  });

  it('should throw an error if upload failed', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      jest.fn(() =>
        Promise.resolve({
          status: 401,
          json: () => Promise.resolve({}),
        })
      ) as jest.Mock
    );

    const { pinToPinata } = usePinataIPFS();

    const data = { description: 'some proposal' };

    try {
      await pinToPinata('someHash', data);
    } catch (e) {
      expect(e).toBeDefined();
    }
  });
});
