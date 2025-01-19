import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sección 1 - Enlaces */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">Inicio</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Servicios</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Productos</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Blog</a>
            </li>
          </ul>
        </div>

        {/* Sección 2 - Acerca de */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Acerca de</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">Nuestra Historia</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Misión y Visión</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Carreras</a>
            </li>
          </ul>
        </div>

        {/* Sección 3 - Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contacto</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:info@ejemplo.com" className="hover:text-blue-400">info@ejemplo.com</a>
            </li>
            <li>
              <a href="tel:+123456789" className="hover:text-blue-400">+123 456 789</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Redes Sociales</a>
            </li>
          </ul>
        </div>

        {/* Sección 4 - Política */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Política</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-blue-400">Términos y Condiciones</a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-400">Privacidad</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8">
        <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
