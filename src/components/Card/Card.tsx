import { type FormData } from '@/store/useFormStore';

const Card = (data: FormData): React.JSX.Element => {
  const { name, email, bread } = data;

  return (
    <div className="relative flex flex-row gap-3 bg-gray-950/50 p-4 rounded">
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{bread}</p>
    </div>
  );
};

export default Card;
