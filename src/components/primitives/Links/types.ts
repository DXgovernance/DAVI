import { DecodedCall } from 'components/ActionsBuilder/types';
import { ReactNode } from 'react';

export interface BlockExplorerLinkProps {
  decodedCall: DecodedCall;
  showAvatar?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}
