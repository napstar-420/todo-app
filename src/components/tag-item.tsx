import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from './ui/badge';

interface TagItemProps {
  name: string;
  href: string;
  key?: number | string;
}

export default function TagItem({ name, href, key }: TagItemProps) {
  const location = useLocation();
  return (
    <NavLink to={href} key={key}>
      <Badge variant={location.pathname === href ? 'default' : 'secondary'}>
        #{name}
      </Badge>
    </NavLink>
  );
}
