import { createContext, useEffect, useState } from "react";

type OrderContextProps = {
  appettizerOrder: any[];
  hamburgerOrder: any[];
  beveregeOrder: any[];
  order: {
    appettizer: any[];
    hamburger: any[];
    combo: any[];
    dessert: any[];
    beverage: any[];
    totalValue: number;
  };
  setAppettizerOrder: React.Dispatch<React.SetStateAction<any[]>>;
  setHamburgerOrder: React.Dispatch<React.SetStateAction<any[]>>;
  setBeveregeOrder: React.Dispatch<React.SetStateAction<any[]>>;
  setOrder: React.Dispatch<
    React.SetStateAction<{
      appettizer: any[];
      hamburger: any[];
      combo: any[];
      dessert: any[];
      beverage: any[];
      totalValue: number;
    }>
  >;
};

const OrderContext = createContext<OrderContextProps>({} as OrderContextProps);

const OrderContextProvider: React.FC = ({ children }) => {
  const inicialOrder = {
    appettizer: [],
    hamburger: [],
    combo: [],
    dessert: [],
    beverage: [],
    totalValue: 0,
  };

  const [appettizerOrder, setAppettizerOrder] = useState<any[]>([]);
  const [hamburgerOrder, setHamburgerOrder] = useState<any[]>([]);
  const [beveregeOrder, setBeveregeOrder] = useState<any[]>([]);
  const [order, setOrder] = useState(inicialOrder);

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
      hamburger: hamburgerOrder,
      appettizer: appettizerOrder,
      beverege: beveregeOrder,
      totalValue: sumValues(subtotal),
    };

    console.log(subtotal);
    console.log(internalOrder);

    setOrder(internalOrder);
  }, [hamburgerOrder, appettizerOrder, beveregeOrder, setOrder]);

  const sumValues = (arrayValues: number[]) => {
    return arrayValues.reduce(
      (acumulador, valorAtual) => acumulador + Number(valorAtual),
      0
    );
  };

  const getPrices = (values: any[]) => {
    const result = values.map((item) => item.value);
    return result;
  };

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
