import { NavLink, useLocation } from 'react-router-dom';
import { Badge } from './ui/badge';

interface TagItemProps {
  _id: string;
  name: string;
  href: string;
}

export default function TagItem({ name, href }: TagItemProps) {
  const location = useLocation();
  return (
    <NavLink to={href}>
      <Badge variant={location.pathname === href ? 'default' : 'secondary'}>
        #{name}
      </Badge>
    </NavLink>
  );
}
