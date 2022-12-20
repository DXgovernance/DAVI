import { Option } from '../types';
export interface OptionsListProps {
  isEditable: boolean;
  options: Option[];
  onChange: (options: Option[]) => void;
  addOption: () => void;
  editOption: (option: Option) => void;
}

export enum SimulationState {
  none,
  pending,
  allPassed,
  someFailed,
  error,
}
