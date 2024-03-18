import Loader from './Loader';
import ActionButton from './ActionButton';

const UpdateProductButton = ({
  pendingChanges,
  onClick,
  isLoading,
}: {
  onClick: any;
  pendingChanges: boolean;
  isLoading?: boolean;
}) => {
  if (isLoading) return <Loader />;

  return (
    <ActionButton onClick={onClick} disabled={!pendingChanges}>
      Actualizar
    </ActionButton>
  );
};

export default UpdateProductButton;
