import { type FormData } from '@/store/useFormStore';

const Card = (data: FormData): React.JSX.Element => {
  const { name, email, bread } = data;

  return (
    <div
      className="relative z-10 flex flex-col items-center justify-start gap-3 bg-gray-950/50 w-[200px] h-[250px] p-4 rounded
      hover:scale-105 transition-all duration-300"
    >
      <h2>{name}</h2>
      <p>{email}</p>
      <p>{bread}</p>
    </div>
  );
};

export default Card;
