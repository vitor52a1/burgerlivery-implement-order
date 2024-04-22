import { createContext, useEffect, useState } from "react";

type OrderContextProps = {
  appettizer: [];
  hamburger: [];
  combo: [];
  dessert: [];
  beverage: [];
  totalValue: number;
};

const OrderContext = createContext<OrderContextProps>({});

interface OrderContextProviderProps {
  children: React.ReactNode;
}

const OrderContextProvider = ({ children }: OrderContextProviderProps) => {
  const inicialOrder = {
    appettizer: [],
    hamburger: [],
    combo: [],
    dessert: [],
    beverage: [],
    totalValue: 0,
  };

  const [appettizerOrder, setAppettizerOrder] = useState([]);
  const [hamburgerOrder, setHamburgerOrder] = useState([]);
  const [beveregeOrder, setBeveregeOrder] = useState([]);
  const [order, setOrder] = useState(inicialOrder);

  const sumValues = (arrayValues) => {
    return arrayValues.reduce(
      (acumulador, valorAtual) => acumulador + Number(valorAtual),
      0
    );
  };

  const getPrices = (values) => {
    const result = values.map((item) => item.value);
    return result;
  };

  useEffect(() => {
    const subTotalHamburgers = getPrices(hamburgerOrder);
    const subTotalAppetizer = getPrices(appettizerOrder);
    const subTotalBeverege = getPrices(beveregeOrder);
    const subtotal = subTotalHamburgers.concat(
      subTotalAppetizer,
      subTotalBeverege
    );

    const internalOrder = {
      ...order,
      ["hamburger"]: hamburgerOrder,
      ["appettizer"]: appettizerOrder,
      ["beverege"]: beveregeOrder,
      totalValue: sumValues(subtotal),
    };

    console.log(subtotal);
    console.log(internalOrder);

    setOrder(internalOrder);
  }, [hamburgerOrder, appettizerOrder, setOrder]);

  return (
    <OrderContext.Provider
      value={{
        appettizerOrder,
        setAppettizerOrder,
        hamburgerOrder,
        setHamburgerOrder,
        beveregeOrder,
        setBeveregeOrder,
        order,
        setOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export { OrderContextProvider };
export default OrderContext;
