import React from 'react';
import { useNavigate } from 'react-router-dom';
import { removeTokens } from '../utils/auth';

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeTokens(); // Supprimer les tokens
    navigate('/'); // Rediriger vers la page de connexion
  };

  return <button onClick={handleLogout}>Se déconnecter</button>;
};

export default Logout;
