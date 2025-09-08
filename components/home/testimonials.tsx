import { Star } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";

export function Testimonials() {
  const testimonials = [
    {
      name: "María González",
      location: "Bogotá",
      text: "La calidad de la ropa es excepcional. El corte y los materiales son perfectos. Definitivamente mi tienda favorita.",
      rating: 5,
    },
    {
      name: "Carlos Mendoza",
      location: "Medellín",
      text: "Servicio al cliente excelente y envíos súper rápidos. La ropa llega en perfectas condiciones.",
      rating: 5,
    },
    {
      name: "Ana Rodríguez",
      location: "Cali",
      text: "Me encanta el estilo minimalista. Cada pieza que he comprado se ha convertido en básico de mi guardarropa.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Lo Que Dicen Nuestros Clientes
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Miles de clientes satisfechos confían en nosotros para su estilo
            diario
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader className="flex items-center">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="size-4 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground">
                  &quot;{testimonial.text}&quot;
                </p>
              </CardContent>

              <CardFooter className="flex flex-col items-start">
                <div className="font-medium">{testimonial.name}</div>
                <div className="text-sm text-muted-foreground">
                  {testimonial.location}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center space-x-8 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="font-medium">4.9/5</span>
            </div>
            <div>+2,500 reseñas</div>
            <div>95% recomiendan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
