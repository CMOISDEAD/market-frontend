import { Card, CardContent } from "../ui/card";

export function Categories() {
  const categories = [
    {
      name: "Mujer",
      description: "Elegancia y estilo",
      items: "124 productos",
    },
    {
      name: "Hombre",
      description: "Sofisticación moderna",
      items: "98 productos",
    },
    {
      name: "Accesorios",
      description: "Detalles únicos",
      items: "45 productos",
    },
  ];

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Categorías</h2>
          <p className="text-muted-foreground">
            Explora nuestras colecciones cuidadosamente seleccionadas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Card key={category.name}>
              <CardContent className="text-center">
                <h3 className="text-xl font-medium mb-2">{category.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <span className="text-sm">{category.items}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
