import { IOrder } from "@/interfaces/IOrder";
import { useState } from "react";
import { EditOrder } from "./EditOrder";
import { CreateTicketForm } from "./CreateTicketForm";
interface IProps {
  order: IOrder;
}

function Order({ order }: IProps) {

  // STATE
  const [isEditing, setIsEditing] = useState(false);

  // METHODS

  const handleToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <section
      className="flex shadow-2xl border-stone-100 border-2 p-5"
    >
        {isEditing ? (
          <EditOrder
            order={order}
            setIsEditing={setIsEditing}
          />
        ) : (
          <CreateTicketForm
            order={order} 
            isEditing={isEditing}
            handleToggleEdit={handleToggleEdit}
          />
        )}
    </section>
  );
}

export default Order;
