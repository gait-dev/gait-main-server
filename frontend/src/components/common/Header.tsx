import React from 'react';
import { Link } from 'react-router-dom';
import { removeTokens } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  centralComponent: React.ReactNode; // Composant à afficher au centre
}

const Header: React.FC<HeaderProps> = ({ centralComponent }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeTokens(); // Supprime les tokens d'authentification
    navigate('/'); // Redirige vers la page de connexion
  };

  return (
    <header className="bg-sky-400 text-white">
      <div className="w-full px-4 py-2 flex justify-between items-center gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Gait</Link>
        </div>

        {/* Navigation */}
        <div className='w-full'>
          {centralComponent}
        </div>

        {/* Bouton de déconnexion */}
        <button
          onClick={handleLogout}
          className="bg-rose-500 hover:bg-rose-600 text-slate-100 px-4 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>
    </header>
  );
};

export default Header;
