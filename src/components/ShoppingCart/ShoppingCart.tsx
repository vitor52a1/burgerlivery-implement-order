import { useContext } from "react";
import OrderContext from "../../context/OrderContext";
import { ShoppingCartElement } from "./ShoppingCart.style";
import { priceFormat } from "../../helpers/priceFormat";

interface ShoppingCartProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShoppingCart = ({ isOpen, onClose }: ShoppingCartProps) => {
  const { hamburgerOrder, appettizerOrder, order, setOrder } =
    useContext(OrderContext);

  const clearCart = () => {
    // Limpa os pedidos definindo arrays vazios e resetando o totalValue
    setOrder({
      hamburgerOrder: [],
      appettizerOrder: [],
      totalValue: 0,
    });
  };

  const removeItem = (item: any, type: string) => {
    // Remove o item do tipo especificado e atualiza o estado
    if (type === "hamburger") {
      const updatedOrder = hamburgerOrder.filter((hamburger) => hamburger !== item);
      setOrder({ ...order, hamburgerOrder: updatedOrder });
    } else if (type === "appetizer") {
      const updatedOrder = appettizerOrder.filter((appettizer) => appettizer !== item);
      setOrder({ ...order, appettizerOrder: updatedOrder });
    }
  };

  const isCartEmpty = hamburgerOrder.length === 0 && appettizerOrder.length === 0;

  return (
    <ShoppingCartElement open={isOpen}>
      <h1>Carrinho de compras</h1>
      <div>
        {appettizerOrder.map((appettizer, index) => (
          <div key={index}>
            <p>
              {appettizer.name} - {appettizer.size}{" "}
              {priceFormat(appettizer.value)}
            </p>
            <button onClick={() => removeItem(appettizer, "appetizer")} className="responsive-button">
              Excluir
            </button>
          </div>
        ))}
      </div>
      <div>
        {hamburgerOrder.map((hamburger, index) => (
          <div key={index}>
            <p>
              {hamburger.name} {priceFormat(hamburger.value)}
            </p>
            <button onClick={() => removeItem(hamburger, "hamburger")} className="responsive-button">
              Excluir
            </button>
          </div>
        ))}
      </div>
      <div>
        <p>Total: {priceFormat(order.totalValue)}</p>
      </div>
      {!isCartEmpty && (
        <>
          <button onClick={clearCart} className="responsive-button">Limpar Carrinho</button>
        </>
      )}
    </ShoppingCartElement>
  );
};
