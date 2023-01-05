import { ReactNode } from 'react';

export interface BlockExplorerLinkProps {
  address: string;
  showAvatar?: boolean;
  avatarSize?: number;
  shortAddress?: boolean;
  disableLink?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
}
