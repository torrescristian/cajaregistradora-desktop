import { Divider } from '@/modules/common/components/atoms/Divider';
import ModalTemplate from '@/modules/common/components/templates/ModalTemplate';
import FormInput from '@/modules/common/components/atoms/FormInput';
import { ButtonClose } from '@/modules/common/components/atoms/ButtonClose';
import {
  getCloseModal,
  useModalStore,
} from '@/modules/common/contexts/useModalStore';
import {
  getSetDelivery,
  useOrderStore,
} from '@/modules/common/contexts/useOrderStore';
import useFormControl from '@/modules/common/hooks/useFormControl';

import ClientForm from './ClientForm';

interface IProps {
  onSubmit: () => void;
}

export default function DeliveryFormModal({ onSubmit }: IProps) {
  const closeModal = useModalStore(getCloseModal);
  const setDelivery = useOrderStore(getSetDelivery);
  const userNameControl = useFormControl('');
  const userAddressControl = useFormControl('');
  const userPhoneControl = useFormControl('');
  const clientControl = useFormControl(0);

  const handleClickSubmit = () => {
    setDelivery({
      userAddress: userAddressControl.value,
      userName: userNameControl.value,
      userPhone: userPhoneControl.value,
      client: clientControl.value,
    });
    onSubmit();
  };

  return (
    <ModalTemplate disableBackdrop className="border border-white">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="text-lg">Datos para el Delivery</h2>
        <ButtonClose label="" onClick={closeModal} />
      </div>
      <Divider />
      <div className="flex flex-col gap-4">
        <FormInput
          label="Cliente"
          value={userNameControl.value}
          onChange={userNameControl.handleChange}
        />
        <FormInput
          label="Dirección"
          value={userAddressControl.value}
          onChange={userAddressControl.handleChange}
        />
        <FormInput
          label="Teléfono"
          value={userPhoneControl.value}
          onChange={userPhoneControl.handleChange}
        />
        <ClientForm
          onSelect={(client) => {
            clientControl.setValue(client?.id);
            userAddressControl.setValue(client?.address || '');
            userNameControl.setValue(client?.name || '');
            userPhoneControl.setValue(client?.phone_number || '');
          }}
        />
        <button
          type="submit"
          className="btn btn-success text-white"
          onClick={handleClickSubmit}
        >
          Crear Orden
        </button>
      </div>
    </ModalTemplate>
  );
}
