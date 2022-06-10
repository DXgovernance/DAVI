export interface DurationInputProps {
  value: number;
  onChange?: (value: number) => void;
}

export interface WarningInputProps {
  timeColumn: string;
  value: string;
  limit: any;
}
