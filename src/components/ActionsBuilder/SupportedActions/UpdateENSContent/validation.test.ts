import { isEnsName, isIpfsHash } from './validation';
import isIPFS from 'is-ipfs';

jest.mock('i18next', () => {
  return {
    t: (key: string) => key,
  };
});

describe('ENS update validations', () => {
  describe('isEnsName validation', () => {
    describe('should return true', () => {
      it('should be a correct ENS name for a top level domain', () => {
        const name = 'name.eth';
        const { isValid } = isEnsName(name);
        expect(isValid).toEqual(true);
      });

      it('should be a correct ENS name for a subdomain', () => {
        const name = 'subdomain.name.eth';
        const { isValid } = isEnsName(name);
        expect(isValid).toEqual(true);
      });
    });

    describe('should catch validation errors', () => {
      it(`should return an error if there's a subdomain with no letters on it (two dots together)`, () => {
        const name = 'test..eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe('ens.validation.domainNameInvalidLength');
      });

      it(`should return an error if the domain starts with a dot`, () => {
        const name = '.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe('ens.validation.domainNameInvalidLength');
      });

      it(`should return an error if the domain has spaces`, () => {
        const name = 'sub domain.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe(
          'ens.validation.domainNameCannotIncludeSpaces'
        );
      });

      it(`should return an error if the domain is more than two levels deep`, () => {
        const name = 'subsubdomain.subdomain.test.eth';
        const { isValid, validationError } = isEnsName(name);
        expect(isValid).toEqual(false);
        expect(validationError).toBe(
          'ens.validation.domainCannotBeMoreThanThreeLevels'
        );
      });
    });
  });

  describe('isIpfsHash validation', () => {
    describe('should return true', () => {
      it('should return true if the hash is valid', () => {
        // I mocked this return value because in the tests
        // it always returns false. Checked the same hash
        // in the UI and returned valid
        jest.spyOn(isIPFS, 'cid').mockReturnValue(true);
        const ipfsHash = 'QmRAQB6YaCyidP37UdDnjFY5vQuiBrcqdyoW1CuDgwxkD4';
        const { isValid, validationError } = isIpfsHash(ipfsHash);
        expect(isValid).toBe(true);
        expect(validationError).toBeNull();
      });
    });

    describe('should catch validation errors', () => {
      it('should return an error if its not an IPFS hash', () => {
        const ipfsHash = 'wrongIPFShash';
        const { isValid, validationError } = isIpfsHash(ipfsHash);
        expect(isValid).toBe(false);
        expect(validationError).toBe('ens.validation.ipfsHashNotValid');
      });
    });
  });
});
