import { createGlobalStyle } from 'styled-components';
import DatePicker from 'react-datepicker';
import moment, { Moment } from 'moment';
import 'react-datepicker/dist/react-datepicker.css';
import { Input, InputProps } from 'components/primitives/Forms/Input';
import { forwardRef } from 'react';

const GlobalDatePickerStyles = createGlobalStyle`
  .react-datepicker {
    background-color: ${({ theme }) => theme.colors.bg3};
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.4);
    border: 1px solid ${({ theme }) => theme.colors.border1};
    border-radius: 0.625rem;
    font-family: ${({ theme }) => theme.fonts.body};
    color: ${({ theme }) => theme.colors.white};
  }
  .react-datepicker__day, .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.white};
    width: 2.5rem;
    line-height: 2.5rem;
  }
  .react-datepicker__header {
    color: ${({ theme }) => theme.colors.white};
    background-color: transparent;
    border-bottom: none;
    padding-top: 16px;
  }

  .react-datepicker__navigation--previous {
    left: 8px;
    top: 10px;
  }

  .react-datepicker__navigation--next {
    right: 8px;
    top: 8.5px;
  }

  .react-datepicker__day-names {
    margin-top: 16px;
    margin-bottom: -16px;
  } 

  .react-datepicker__day--keyboard-selected {
    background-color: transparent;
  }

  .react-datepicker__current-month, .react-datepicker__day-name {
    color: ${({ theme }) => theme.colors.white};
  }

  .react-datepicker__day:hover {
    background: ${({ theme }) => theme.colors.bg4};
    border-radius: 50%;
    outline: 1px solid ${({ theme }) => theme.colors.text};
  }

  .react-datepicker__day--selected {
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.bg1};
    cursor: pointer;
  }

  .react-datepicker__day--outside-month {
    color: ${({ theme }) => theme.colors.grey};
  }

  .react-datepicker__triangle::before, .react-datepicker__triangle::after{
    border-top-color: ${({ theme }) => theme.colors.bg3} !important;
    border-bottom-color: ${({ theme }) => theme.colors.bg3} !important;
  }
`;

// TODO: Implement time and datetime
export enum InputType {
  DATE,
  TIME,
  DATETIME,
}

export interface DateInputProps extends InputProps<string | Moment> {
  isUTC?: boolean;
  inputType?: InputType;
  isValidDate?: (date: Moment) => boolean;
}

export const DateInput: React.FC<DateInputProps> = ({
  value,
  onChange,
  inputType = InputType.DATE,
  isUTC = false,
  isValidDate = () => true,
  ...rest
}) => {
  const CustomInput = forwardRef(({ value, onClick }: any, ref) => (
    <Input onClick={onClick} readOnly value={value} {...rest} />
  ));

  return (
    <>
      <GlobalDatePickerStyles />
      <DatePicker
        selected={value && moment(value).toDate()}
        onChange={date => {
          onChange(moment(date));
        }}
        dateFormat={'dd/MM/yyyy'}
        onMonthChange={() => {}}
        closeOnScroll={true}
        customInput={<CustomInput />}
      />
    </>
  );
};
