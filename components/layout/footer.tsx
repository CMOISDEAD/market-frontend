import { Logo } from "@/components/navbar/logo";

export function Footer() {
  return (
    <footer className="w-full py-12 px-4 bg-dark-600 border-t border-input">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
          <div className="flex flex-col items-center">
            <Logo />
            <p className="text-muted-foreground text-sm italic">
              &quot;Ropa Premium desde 2020&quot;
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-12">
            <div className="flex flex-col items-center md:items-start space-y-2">
              <h4 className="font-medium text-sm">Company</h4>
              <div className="flex flex-col items-center md:items-start space-y-1 text-xs">
                <span className="">Nosotros</span>
                <span className="">Contacto</span>
              </div>
            </div>

            <div className="flex flex-col items-center md:items-start space-y-2">
              <h4 className="font-medium text-sm">Support</h4>
              <div className="flex flex-col items-center md:items-start space-y-1 text-xs">
                <span className="">Guia de tallas</span>
                <span className="">Rembolsos</span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-xs">
              &copy; 2025 MBS. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
