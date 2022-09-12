import styled from 'styled-components';
import { Controller, useForm } from 'react-hook-form';
import {
  ActionsButton,
  FormElement,
  FormError,
  FormLabel,
  Wrapper,
} from '../../ActionsModal.styled';
import { RichContractFunction } from 'hooks/Guilds/contracts/useRichContractRegistry';
import FormElementRenderer, {
  getDefaultValidationsByFormElement,
} from './FormElementRenderer';
import { useProvider } from 'wagmi';
import { enc, SHA256 } from 'crypto-js';

const SubmitButton = styled(ActionsButton).attrs(() => ({
  variant: 'primary',
}))`
  background-color: ${({ theme }) => theme.colors.primary1};
  justify-content: center;
`;

interface ParamsFormProps {
  fn: RichContractFunction;
  contractBytecodeHash?: string;
  defaultValues?: Record<string, any>;
  onSubmit: (args: Record<string, any>) => void;
}

const ParamsForm: React.FC<ParamsFormProps> = ({
  fn,
  contractBytecodeHash,
  defaultValues,
  onSubmit,
}) => {
  const { control, handleSubmit } = useForm();

  const provider = useProvider();
  const getDefaultValidationsForClonedContract = () => {
    const validations = getDefaultValidationsByFormElement('address');

    if (typeof validations.validate === 'function') {
      validations.validate = { default: validations.validate };
    }

    validations.validate = {
      ...validations.validate,
      isValidClone: async value => {
        const btcode = await provider.getCode(value);
        if (btcode === '0x') return "Contract doesn't exist.";

        const hashedBytecode = `0x${SHA256(btcode).toString(enc.Hex)}`;

        return (
          hashedBytecode === contractBytecodeHash ||
          'Contract is of wrong type.'
        );
      },
    };

    return validations;
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        {contractBytecodeHash && (
          <FormElement key="_clonedContractAddress">
            <FormLabel>Contract address to call</FormLabel>
            <Controller
              name="_clonedContractAddress"
              control={control}
              defaultValue={''}
              rules={getDefaultValidationsForClonedContract()}
              render={({ field, fieldState }) => (
                <>
                  <FormElementRenderer
                    formElement={'address'}
                    {...field}
                    isInvalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FormError>{fieldState.error.message}</FormError>
                  )}
                </>
              )}
            />
          </FormElement>
        )}

        {fn.params.map(param => (
          <FormElement key={param.name}>
            <FormLabel>{param.description}</FormLabel>
            <Controller
              name={param.name}
              control={control}
              defaultValue={defaultValues?.[param.name] || param.defaultValue}
              rules={getDefaultValidationsByFormElement(param.component)}
              render={({ field, fieldState }) => (
                <>
                  <FormElementRenderer
                    formElement={param.component}
                    {...field}
                    isInvalid={fieldState.invalid}
                  />
                  {fieldState.error && (
                    <FormError>{fieldState.error.message}</FormError>
                  )}
                </>
              )}
            />
          </FormElement>
        ))}

        <FormElement>
          <SubmitButton type="submit">Add action</SubmitButton>
        </FormElement>
      </form>
    </Wrapper>
  );
};

export default ParamsForm;
