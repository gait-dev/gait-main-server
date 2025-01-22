import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosConfig";
import { setTokens } from "../utils/auth";

const LoginView: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axiosInstance.post("login/", {
        username,
        password,
      });
      const { user, access, refresh } = response.data;
      setTokens(user, access, refresh); // St
      // ocker les tokens
      navigate("/appointments"); // Redirige vers la liste des patients
    } catch (err) {
      setError("Identifiants invalides. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom d'utilisateur :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>Mot de passe :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default LoginView;
