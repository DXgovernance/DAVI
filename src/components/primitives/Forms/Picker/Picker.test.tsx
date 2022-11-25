import { render } from 'utils/tests';
import { fullProps, propsWithIcon } from './fixtures';
import Picker from './Picker';
import { fireEvent } from '@testing-library/react';
import { Avatar } from 'components/Avatar/Avatar';
import dxdaoIcon from 'assets/images/dxdao-icon.svg';

const mockOnSelect = jest.fn();
fullProps.onSelect = mockOnSelect;

describe('Picker', () => {
  let getByText;
  let getByPlaceholderText;
  let queryByText;

  describe('General interactions', () => {
    beforeEach(() => {
      let component = render(<Picker {...fullProps} />);
      getByText = component.getByText;
      getByPlaceholderText = component.getByPlaceholderText;
      queryByText = component.queryByText;
    });

    it('should render the component', () => {
      const searchbar = getByPlaceholderText('search');
      const firstOptionTitle = getByText(fullProps.data[0].title);
      const firstOptionSubtitle = getByText(fullProps.data[0].subtitle);
      const firstOptionRightData = getByText(fullProps.data[0].rightData);

      expect(searchbar).toBeInTheDocument();
      expect(firstOptionTitle).toBeInTheDocument();
      expect(firstOptionSubtitle).toBeInTheDocument();
      expect(firstOptionRightData).toBeInTheDocument();
    });

    it('should return the object when clicked', () => {
      const firstOption = getByText(fullProps.data[0].title);
      fireEvent.click(firstOption);

      expect(mockOnSelect).toHaveBeenCalledWith(fullProps.data[0]);
    });

    it('should filter options when searching', () => {
      const searchbar = getByPlaceholderText('search');
      fireEvent.input(searchbar, {
        target: { value: 'lorem' },
      });

      const firstOption = queryByText(fullProps.data[0].title);
      const searchedOption = getByText(fullProps.data[3].title);

      expect(firstOption).toBeNull();
      expect(searchedOption).toBeInTheDocument();
    });
  });

  describe('Component rendering with special props', () => {
    it('should render a component with an icon', () => {
      propsWithIcon.data.map(option => {
        return (option.icon = <Avatar src={dxdaoIcon} defaultSeed={null} />);
      });
      let component = render(<Picker {...propsWithIcon} />);

      const avatar = component.getAllByAltText('Avatar');
      expect(avatar[0]).toBeInTheDocument();
    });

    it('should accept a parameter to change number of visible objects', () => {
      let component = render(
        <Picker {...fullProps} numberOfVisibleItems={2} />
      );

      let numberOfOptions = component.getAllByLabelText('Option item', {
        exact: false,
      });

      expect(numberOfOptions).toHaveLength(2);
    });
  });
});
