import { useState, useRef } from 'react';
import { isMobile, isDesktop } from 'react-device-detect';
import { FiChevronDown, FiCheck, FiArrowLeft } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

import { ProposalState } from 'types/types.guilds.d';
import { useFilter } from 'contexts/Guilds/filters';
import { useDetectBlur } from 'hooks/Guilds/useDetectBlur';

import {
  DropdownContent,
  DropdownHeader,
  DropdownMenu,
  DropdownPosition,
} from 'old-components/Guilds/common/DropdownMenu';

import { Menu } from 'old-components/Guilds/common/Menu';

import {
  DropdownMenuItem,
  FilterButtons,
  FilterResetMobile,
  FilterResetDesktop,
  FilterButton,
} from './FilterMenu.styled';

const FilterMenu = () => {
  const { t } = useTranslation();
  const [showState, setShowState] = useState(false);
  const [showType, setShowType] = useState(false);
  const [showCurrency, setShowCurrency] = useState(false);

  const {
    onToggleState,
    onResetState,
    isStateSelected,
    countStateSelected,
    onToggleType,
    onResetType,
    isTypeSelected,
    countTypeSelected,
    onToggleCurrency,
    onResetCurrency,
    isCurrencySelected,
    countCurrencySelected,
  } = useFilter();

  const stateRef = useRef(null);
  const typeRef = useRef(null);
  const currencyRef = useRef(null);

  // hook that handles the click outside the ref element, when clicked calls callback to close.
  useDetectBlur(stateRef, () => setShowState(false));
  useDetectBlur(typeRef, () => setShowType(false));
  useDetectBlur(currencyRef, () => setShowCurrency(false));

  return (
    <FilterButtons>
      <DropdownMenu ref={stateRef} position={DropdownPosition.BottomRight}>
        <FilterButton
          iconRight
          onClick={() => {
            setShowState(!showState);
          }}
        >
          {t('state')} <FiChevronDown />
        </FilterButton>
        <DropdownContent fullScreenMobile={true} show={showState}>
          {isMobile && (
            <DropdownHeader onClick={() => setShowState(false)}>
              <FiArrowLeft /> <span>{t('state')}</span>{' '}
              <FilterResetMobile onClick={onResetState}>
                {t('reset')}
              </FilterResetMobile>
            </DropdownHeader>
          )}
          <Menu>
            {Object.values(ProposalState).map(state => {
              return (
                <DropdownMenuItem
                  key={state}
                  onClick={() => onToggleState(state)}
                >
                  {state} {isStateSelected(state) && <FiCheck />}
                </DropdownMenuItem>
              );
            })}
          </Menu>
          {isDesktop && countStateSelected > 0 && (
            <FilterResetDesktop onClick={onResetState}>
              {t('reset')}
            </FilterResetDesktop>
          )}
        </DropdownContent>
      </DropdownMenu>
      <DropdownMenu ref={typeRef} position={DropdownPosition.BottomRight}>
        <FilterButton iconRight onClick={() => setShowType(!showType)}>
          {t('type')} <FiChevronDown />
        </FilterButton>
        <DropdownContent fullScreenMobile={true} show={showType}>
          {isMobile && (
            <DropdownHeader onClick={() => setShowType(false)}>
              <FiArrowLeft /> <span> {t('type')}</span>{' '}
              <FilterResetMobile onClick={onResetType}>
                {t('reset')}
              </FilterResetMobile>
            </DropdownHeader>
          )}
          <Menu>
            <DropdownMenuItem onClick={() => onToggleType('a')}>
              {t('type')} a {isTypeSelected('a') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleType('b')}>
              {t('type')} b {isTypeSelected('b') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleType('c')}>
              {t('type')} c {isTypeSelected('c') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleType('d')}>
              {t('type')} d {isTypeSelected('d') && <FiCheck />}
            </DropdownMenuItem>
          </Menu>
          {isDesktop && countTypeSelected > 0 && (
            <FilterResetDesktop onClick={onResetType}>
              {t('reset')}
            </FilterResetDesktop>
          )}
        </DropdownContent>
      </DropdownMenu>

      <DropdownMenu ref={currencyRef} position={DropdownPosition.BottomRight}>
        <FilterButton iconRight onClick={() => setShowCurrency(!showCurrency)}>
          {t('currency')} <FiChevronDown />
        </FilterButton>
        <DropdownContent fullScreenMobile={true} show={showCurrency}>
          {isMobile && (
            <DropdownHeader onClick={() => setShowCurrency(false)}>
              <FiArrowLeft /> <span>{t('currency')}</span>{' '}
              <FilterResetMobile onClick={onResetCurrency}>
                {t('reset')}
              </FilterResetMobile>
            </DropdownHeader>
          )}
          <Menu>
            <DropdownMenuItem onClick={() => onToggleCurrency('a')}>
              {t('currency')} a {isCurrencySelected('a') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleCurrency('b')}>
              {t('currency')} b {isCurrencySelected('b') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleCurrency('c')}>
              {t('currency')} c {isCurrencySelected('c') && <FiCheck />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onToggleCurrency('d')}>
              {t('currency')} d {isCurrencySelected('d') && <FiCheck />}
            </DropdownMenuItem>
          </Menu>
          {isDesktop && countCurrencySelected > 0 && (
            <FilterResetDesktop onClick={onResetCurrency}>
              {t('reset')}
            </FilterResetDesktop>
          )}
        </DropdownContent>
      </DropdownMenu>
    </FilterButtons>
  );
};

export default FilterMenu;
