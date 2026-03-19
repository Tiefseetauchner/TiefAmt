import { gcn } from '../../utils/govClassNames';
import type { GovSidebarProps } from './GovSidebar.types';

export function GovSidebar({ children, className, ...rest }: GovSidebarProps) {
  return (
    <aside className={gcn('gov-sidebar', className)} {...rest}>
      {children}
    </aside>
  );
}

export default GovSidebar;
