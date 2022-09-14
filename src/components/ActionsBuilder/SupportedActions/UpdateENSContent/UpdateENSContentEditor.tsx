/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { Control, ControlLabel, ControlRow } from './styles';
import { Input } from 'components/primitives/Forms/Input';
import { ReactComponent as Info } from 'assets/images/info.svg';
import {
  convertToContentHash,
  convertToNameHash,
  isSupportedChainId,
} from './utils';
import { useDebounce } from 'hooks/Guilds/useDebounce';
import { useTranslation } from 'react-i18next';
import { useNetwork, useEnsResolver } from 'wagmi';
import { ActionEditorProps } from '..';
import { useUpdateEnsContent } from 'hooks/Guilds/useUpdateEnsContent';
import { Tooltip } from 'components/Tooltip';
import { StyledIcon } from 'components/primitives/StyledIcon';
import { LOCALHOST_ID } from 'utils';
import { Controller, useForm } from 'react-hook-form';
import validateENSContent from './validateENSContent';
import { Button } from 'components/primitives/Button';
import { ErrorLabel } from 'components/primitives/Forms/ErrorLabel';
import styled from 'styled-components';

export interface ENSContentForm {
  ensName: string;
  ipfsHash: string;
}

const Error = styled(ErrorLabel)`
  margin-top: 0.5rem;
`;

const UpdateENSContentEditor: React.FC<ActionEditorProps> = ({
  decodedCall,
  onSubmit,
}) => {
  const { parsedData } = useUpdateEnsContent({ decodedCall });
  const { t } = useTranslation();

  const { control, handleSubmit, getValues } = useForm<ENSContentForm>({
    resolver: validateENSContent,
    context: { t },
    defaultValues: parsedData?.optionalProps,
  });

  const { ensName } = getValues();

  // useDebounce will make sure we're not spamming the resolver
  const debouncedEnsName = useDebounce(ensName, 200);

  const { chain } = useNetwork();
  const chainId = isSupportedChainId(chain.id);
  const { data: resolver } = useEnsResolver({
    name: `${debouncedEnsName}.eth`,
    chainId,
  });

  const submitAction = (values: ENSContentForm) => {
    const fullEnsName = `${values.ensName}.eth`;

    const { nameHash } = convertToNameHash(fullEnsName);
    const { contentHash } = convertToContentHash(values.ipfsHash);
    debugger;

    onSubmit({
      ...decodedCall,
      to: resolver?.address,
      args: {
        ...decodedCall.args,
        node: nameHash,
        hash: contentHash,
      },
      optionalProps: {
        ...decodedCall.optionalProps,
        ensName: values.ensName,
        ipfsHash: values.ipfsHash,
      },
    });
  };

  if (chain.id === LOCALHOST_ID)
    console.warn(
      `ENS content doesn't work on Localhost. This action is left here just for development purposes but will throw an error if its included in a proposal.`
    );

  return (
    <div>
      <form onSubmit={handleSubmit(submitAction, console.error)}>
        <Controller
          name="ensName"
          control={control}
          render={({ field: { ref, ...field }, fieldState }) => {
            const { invalid, error } = fieldState;

            return (
              <Control>
                <ControlLabel>
                  {t('ens.name')}
                  <Tooltip text={t('ens.nameTooltip')} placement="bottom">
                    <StyledIcon src={Info} />
                  </Tooltip>
                </ControlLabel>
                <ControlRow>
                  <Input
                    {...field}
                    isInvalid={invalid && !!error}
                    onChange={e => field.onChange(e.target.value)}
                  />
                  <p>.eth</p>
                </ControlRow>
                {invalid && !!error && <Error>{error.toString()}</Error>}
              </Control>
            );
          }}
        />

        <ControlRow>
          <Controller
            name="ipfsHash"
            control={control}
            render={({ field: { ref, ...field }, fieldState }) => {
              const { invalid, error } = fieldState;

              return (
                <Control>
                  <ControlLabel>
                    {t('ens.ipfsHash')}
                    <Tooltip text={t('ens.ipfsHashToolTip')}>
                      <StyledIcon src={Info} />
                    </Tooltip>
                  </ControlLabel>
                  <ControlRow>
                    <Input
                      {...field}
                      isInvalid={invalid && !!error}
                      onChange={e => field.onChange(e.target.value)}
                    />
                  </ControlRow>
                  {invalid && !!error && <Error>{error.toString()}</Error>}
                </Control>
              );
            }}
          />
        </ControlRow>
        <Button fullWidth data-testid="submit-enscontent" type="submit">
          {t('saveAction')}
        </Button>
      </form>
    </div>
  );
};

export default UpdateENSContentEditor;
