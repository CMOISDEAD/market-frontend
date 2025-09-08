import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <section className="py-20 px-4 bg-fashion-dark text-white">
      <div className="container mx-auto text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-light">Mantente al Día</h2>
            <p className="text-gray-300 leading-relaxed">
              Sé el primero en conocer nuestras nuevas colecciones, ofertas
              exclusivas y consejos de estilo. Sin spam, solo contenido de
              valor.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-white"
              />
              <Button
                type="submit"
                className="bg-white text-fashion-dark hover:bg-gray-200 px-8"
              >
                Suscribirse
              </Button>
            </div>
          </form>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm text-gray-300">15k+ suscriptores</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm text-gray-300">Ofertas exclusivas</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-sm text-gray-300">Tips de estilo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
