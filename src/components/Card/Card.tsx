import type { IFormData } from '@/types/types';

const Card = (data: IFormData): React.JSX.Element => {
  const { name, age, email, gender, picture, country } = data;

  return (
    <div className="relative flex flex-row gap-3 bg-gray-950/50 p-4 rounded">
      <h2 className="flex flex-col justify-center items-center text-lg font-bold">
        <img
          src={picture || '/images/bread.png'}
          alt={name}
          className="w-16 h-16"
        />
        {name}
      </h2>
      <h3 className="flex flex-col justify-center items-center">
        {' '}
        <p>{age} years old</p>
        <p>{email}</p>
        <p>gender: {gender}</p>
        <p>country: {country}</p>
      </h3>
    </div>
  );
};

export default Card;
