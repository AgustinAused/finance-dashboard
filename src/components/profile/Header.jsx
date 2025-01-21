import React from 'react';
import { FaUserCircle } from 'react-icons/fa'; // Importa el ícono

export default function ProfileHeader({ user, onEditClick }) {
  return (
    <div className="p-6">
      {/* Encabezado del perfil */}
      <header className="profile-header">
      {user.avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt={`${user.firstName} ${user.lastName}`}
                        className="profile-header-avatar"
                    />
                ) : (
                    <FaUserCircle className="text-primary-light profile-header-avatar" size={64} />
                )}
        <div className="profile-header-info">
          <h1 className="flex items-center gap-2">
            {`${user.firstName} ${user.lastName}`}
            {!user.active && (
              <span className="text-danger text-sm font-medium">(Deshabilitado)</span>
            )}
          </h1>
          <h2>{user.email}</h2>
        </div>
      </header>

      {/* Información del perfil */}
      <section className="profile-section">
        <h3 className="profile-section-title">Información Personal</h3>
        <div className="profile-section-content">
          <p>
            <strong>Teléfono: </strong>
            {user.phone || 'No proporcionado'}
          </p>
          <p>
            <strong>Estado: </strong>
            {user.active ? 'Activo' : 'Inactivo'}
          </p>
          <button className="btn" onClick={onEditClick}>
          Editar Perfil
        </button>
        </div>
      </section>

      {/* Empresa */}
      <section className="profile-section">
        <h3 className="profile-section-title">Empresa</h3>
        <div className="profile-section-content">
          <p>
            <strong>Nombre: </strong>
            {user.company.name || 'Sin especificar'}
          </p>
          <p>
            <strong>email: </strong>
            {user.company.address || 'Sin especificar'}
          </p>
          <p>
            <strong>Nombre: </strong>
            {user.company.phone || 'Sin especificar'}
          </p>
        </div>
      </section>
    </div>
  );
}
