const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sección 1 - Enlaces */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Enlaces</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:text-primary">Inicio</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Servicios</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Productos</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Blog</a>
            </li>
          </ul>
        </div>

        {/* Sección 2 - Acerca de */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Acerca de</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:text-primary">Nuestra Historia</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Misión y Visión</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Carreras</a>
            </li>
          </ul>
        </div>

        {/* Sección 3 - Contacto */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Contacto</h3>
          <ul className="space-y-2">
            <li>
              <a href="mailto:info@ejemplo.com" className="text-white hover:text-primary">info@ejemplo.com</a>
            </li>
            <li>
              <a href="tel:+123456789" className="text-white hover:text-primary">+123 456 789</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Redes Sociales</a>
            </li>
          </ul>
        </div>

        {/* Sección 4 - Política */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-primary">Política</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-white hover:text-primary">Términos y Condiciones</a>
            </li>
            <li>
              <a href="#" className="text-white hover:text-primary">Privacidad</a>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8 text-white">
        <p>&copy; {new Date().getFullYear()} Tu Empresa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;