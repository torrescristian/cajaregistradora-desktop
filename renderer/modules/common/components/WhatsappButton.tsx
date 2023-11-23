import { mergeClasses } from '@/modules/common/libs/utils';

interface IProps {
  className?: string;
}

const WhatsappButton = ({ className }: IProps) => (
  <a
    href="https://wa.me/5493513863151?text=Hola!%20Quiero%20saber%20m%C3%A1s%20sobre%20CajaRegistradora.app"
    target="_blank"
    className={mergeClasses(
      'btn-success btn w-fit rounded-md font-semibold',
      className,
    )}
  >
    Contactanos por WhatsApp
  </a>
);

export default WhatsappButton;
