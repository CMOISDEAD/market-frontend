import { Truck, Shield, RefreshCw, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export function Benefits() {
  const benefits = [
    {
      icon: Truck,
      title: "Envío Gratuito",
      description: "En compras superiores a $150.000 COP",
    },
    {
      icon: Shield,
      title: "Compra Segura",
      description: "Protección total en todas las transacciones",
    },
    {
      icon: RefreshCw,
      title: "Cambios Fáciles",
      description: "30 días para cambios y devoluciones",
    },
    {
      icon: Star,
      title: "Calidad Premium",
      description: "Materiales de la más alta calidad",
    },
  ];

  return (
    <section className="py-16 px-4 bg-secondary">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit) => (
            <Card key={benefit.title} className="text-center group">
              <CardContent>
                <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4">
                  <benefit.icon className="size-6" />
                </div>
                <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
