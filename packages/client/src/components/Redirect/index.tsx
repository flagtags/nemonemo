import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Redirect = ({ path }: { path: string }) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log('redirect to ', path);
    navigate(path);
  }, [path]);

  return null;
};
