import { useFormStore } from '@/store/useFormStore';
import type { IFormData } from '@/types/types';
import { useForm } from 'react-hook-form';

type HookFormProps = {
  onClose: () => void;
};
const HookForm = ({ onClose }: HookFormProps) => {
  const { addUser } = useFormStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>();

  const onSubmit = (data: IFormData) => {
    const userData = {
      name: data.name,
      age: Number(data.age),
      email: data.email,
      gender: data.gender,
      picture: data.picture,
      country: data.country,
    };

    addUser(userData);
    setTimeout(() => {
      onClose();
    }, 500);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
      <label>Name</label>
      <input className="btn" {...register('name', { required: true })} />
      {errors.name && <span>{errors.name.message}</span>}
      <label>Age</label>
      <input className="btn" {...register('age', { required: true })} />
      <label>Email</label>
      <input className="btn" {...register('email', { required: true })} />
      <label>Password</label>
      <input className="btn" {...register('password', { required: true })} />
      <label>Confirm Password</label>
      <input
        className="btn"
        {...register('confirmPassword', { required: true })}
      />
      <label>Gender</label>
      <select className="btn" {...register('gender', { required: true })}>
        <option value="male">male</option>
        <option value="female">female</option>
        <option value="other">other</option>
      </select>
      <label>Picture</label>
      <input className="btn" {...register('picture')} />
      <label>Country</label>
      <input className="btn" {...register('country', { required: true })} />

      <input className="btn" type="submit" />
    </form>
  );
};

export default HookForm;
