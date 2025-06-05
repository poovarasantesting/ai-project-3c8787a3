import { Link } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { ShoppingCart, Eye } from "lucide-react";
import { Product } from "@/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toast } = useToast();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart(product, 1);
    
    toast({
      title: "Added to cart",
      description: `${product.title} added to your cart.`,
      duration: 3000,
    });
  };

  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md group">
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative aspect-square bg-white p-6 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-[180px] max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
          
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <Button variant="secondary" size="sm" className="mx-2">
              <Eye className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-1">
            <span className="text-xs text-gray-500 uppercase">{product.category}</span>
          </div>
          <h3 className="font-semibold text-lg mb-2 line-clamp-1">{product.title}</h3>
          <p className="text-primary font-bold">${product.price.toFixed(2)}</p>
        </CardContent>
        
        <CardFooter className="p-4 pt-0">
          <Button 
            onClick={handleAddToCart}
            className="w-full"
            variant="outline"
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}