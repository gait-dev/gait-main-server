import React from 'react';
import { Link } from 'react-router-dom';
import { removeTokens } from '../../utils/auth';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    removeTokens(); // Supprime les tokens d'authentification
    navigate('/'); // Redirige vers la page de connexion
  };

  return (
    <header className="bg-sky-400 text-white">
      <div className="w-full px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">
          <Link to="/">Gait</Link>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                to="/appointments"
                className="hover:underline hover:text-gray-300"
              >
                Calendrier
              </Link>
            </li>
            <li>
              <Link
                to="/appointments/new"
                className="hover:underline hover:text-gray-300"
              >
                Ajouter un rendez-vous
              </Link>
            </li>
            <li>
              <Link
                to="/patients"
                className="hover:underline hover:text-gray-300"
              >
                Patients
              </Link>
            </li>
          </ul>
        </nav>

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
