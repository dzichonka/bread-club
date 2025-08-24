import { useCountryStore } from '@/store/useCountryStore';
import { useFormStore } from '@/store/useFormStore';
import type { Gender, IFormData } from '@/types/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { schema, type FormSchema } from '@/validation/formSchema';

type HookFormProps = {
  onClose: () => void;
};

const HookForm = ({ onClose }: HookFormProps) => {
  const { addUser } = useFormStore();
  const { countries } = useCountryStore();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormSchema>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormSchema) => {
    const file = data.picture[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;

      const formData: IFormData = {
        ...data,
        age: Number(data.age),
        gender: data.gender as Gender,
        picture: base64,
      };
      addUser(formData);
      setTimeout(onClose, 500);
    };
    reader.readAsDataURL(file);
  };

  return (
    <form
      className="flex flex-col gap-4 min-w-100"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl text-amber-200 text-center">
        Your bread profile
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input
          className="btn pt-2"
          type="text"
          id="name"
          {...register('name')}
        />
        {errors.name && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.name.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="age">Age</label>
        <input className="btn pt-2" type="text" id="age" {...register('age')} />
        {errors.age && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.age.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input
          className="btn pt-2"
          type="email"
          id="email"
          {...register('email')}
        />
        {errors.email && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.email.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="btn pt-2"
          type="password"
          id="password"
          {...register('password')}
        />
        {errors.password && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.password.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          className="btn pt-2"
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
        />
        {errors.confirmPassword && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.confirmPassword.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender">Gender</label>
        <select className="btn" id="gender" {...register('gender')}>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        {errors.gender && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.gender.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="picture">Picture</label>
        <input
          className="btn pt-2"
          type="file"
          accept="image/png, image/jpeg"
          id="picture"
          {...register('picture')}
        />
        {errors.picture && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.picture.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="country">Country</label>
        <select
          id="country"
          className="btn"
          {...register('country', { required: true })}
        >
          <option value="">-- Select a country --</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.country.message}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="acceptTnC"
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            id="acceptTnC"
            type="checkbox"
            {...register('acceptTnC', { required: true })}
            className="peer hidden"
          />
          <div className="w-5 h-5 bg-black border-2 border-amber-300 rounded-full flex items-center justify-center peer-checked:bg-yellow-400"></div>
          Accept Terms and Conditions
        </label>

        {errors.acceptTnC && (
          <span className="text-xs text-amber-100 h-0 text-end">
            You must accept T&C
          </span>
        )}
      </div>

      <input className="btn" type="submit" />
    </form>
  );
};

export default HookForm;
