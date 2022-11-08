import { ReactNode } from 'react';

export interface BlockExplorerLinkProps {
  address: string;
  showAvatar?: boolean;
  avatarSize?: number;
  unstyled?: boolean;
  shortAddress?: boolean;
}

export interface ExternalLinkProps {
  href: string;
  children: ReactNode;
  unstyled?: boolean;
}
