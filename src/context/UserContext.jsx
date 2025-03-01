import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(false);
  const [user, setUser] = useState(null); // Cambiar a null para evitar valores no definidos

  const actualizarUser = (newUser) => {
    setUser(newUser); // Actualizar el estado del usuario
  };

  const actualizarToken = (newToken) => {
    setToken(newToken); // Actualizar el estado del token
  };

  const fetchUserData = async (userId) => {
    if (token && userId) {
      try {
        
        const response = await axios.get(`/usuarios/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setUser(response.data.usuario); // Asegúrate de que los datos del usuario se establezcan correctamente
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserData(user.id);
    }
  }, [token, user]);

  return (
    <UserContext.Provider value={{ token, actualizarToken, actualizarUser, user, fetchUserData }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;