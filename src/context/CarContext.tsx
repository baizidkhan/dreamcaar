import { createContext, useContext, useState, ReactNode } from "react";
import { Car } from "@/data/carsData";

interface CarContextType {
  userCars: Car[];
  addCar: (car: Omit<Car, "id">) => void;
}

const CarContext = createContext<CarContextType | undefined>(undefined);

export const CarProvider = ({ children }: { children: ReactNode }) => {
  const [userCars, setUserCars] = useState<Car[]>([]);

  const addCar = (car: Omit<Car, "id">) => {
    const newCar: Car = {
      ...car,
      id: Date.now(),
    };
    setUserCars((prev) => [newCar, ...prev]);
  };

  return (
    <CarContext.Provider value={{ userCars, addCar }}>
      {children}
    </CarContext.Provider>
  );
};

export const useCarContext = () => {
  const context = useContext(CarContext);
  if (!context) throw new Error("useCarContext must be used within CarProvider");
  return context;
};
