import { gcn } from '../../utils/govClassNames';
import { GovNav } from '../GovNav/GovNav';
import type { GovSidebarProps } from './GovSidebar.types';

export function GovSidebar({ sections, children, className, ...rest }: GovSidebarProps) {
  return (
    <aside className={gcn('gov-sidebar', className)} {...rest}>
      {sections && sections.length > 0 && <GovNav sections={sections} />}
      {children}
    </aside>
  );
}

export default GovSidebar;
