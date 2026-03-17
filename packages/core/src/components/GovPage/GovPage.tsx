import { gcn } from '../../utils/govClassNames';
import type { GovPageProps } from './GovPage.types';

export function GovPage({
  header,
  banner,
  sidebar,
  footer,
  children,
  className,
  ...rest
}: GovPageProps) {
  return (
    <div className={gcn('gov-page', className)} {...rest}>
      {header}
      {banner}
      <div className="gov-page__main">
        {sidebar && <aside className="gov-sidebar">{sidebar}</aside>}
        <main className="gov-page__content">{children}</main>
      </div>
      {footer}
    </div>
  );
}

export default GovPage;
