import { Button } from "@/components/ui/button";

export function SaleSection() {
  return (
    <section className="py-20 px-4 bg-primary text-primary-foreground">
      <div className="container mx-auto text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium">
              OFERTA ESPECIAL
            </span>
            <h2 className="text-4xl md:text-6xl font-bold">Hasta 50% OFF</h2>
            <p className="text-xl">
              En selección de piezas de temporadas anteriores
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="outline"
              className="border-border bg-primary text-primary-foreground hover:bg-background hover:text-foreground"
            >
              Ver Ofertas
            </Button>
            <Button size="lg" variant="secondary">
              Comprar Ahora
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-12 border-t border-border/20">
            <div className="text-center">
              <div className="text-2xl font-light mb-2">48H</div>
              <div className="text-sm text-muted-foreground">
                Tiempo restante
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light mb-2">200+</div>
              <div className="text-sm text-muted-foreground">
                Productos en oferta
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-light mb-2">-50%</div>
              <div className="text-sm text-muted-foreground">
                Descuento máximo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
