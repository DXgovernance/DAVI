import '@testing-library/jest-dom';
import 'jest-styled-components';

jest.mock('react-i18next', () => {
  return {
    __esModule: true,
    useTranslation: () => ({
      t: (key: string) => key,
    }),
    withTranslation: () => (key: string) => key,
  };
});

