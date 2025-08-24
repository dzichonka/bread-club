//import { schema, type FormSchema } from '@/validation/formSchema';
import { useCountryStore } from '@/store/useCountryStore';
import { useFormStore } from '@/store/useFormStore';
import type { Gender } from '@/types/types';
import { useRef, type FormEvent } from 'react';

type UncontrolledFormProps = {
  onClose: () => void;
};

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const { addUser } = useFormStore();
  const { countries } = useCountryStore();
  const formRef = useRef<HTMLFormElement>(null);

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const fileInput = form.elements.namedItem('picture') as HTMLInputElement;
    const file = fileInput.files?.[0];

    let pictureBase64 = '';
    if (file) {
      pictureBase64 = await fileToBase64(file);
    }

    addUser({
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      age: Number((form.elements.namedItem('age') as HTMLInputElement).value),
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      confirmPassword: (
        form.elements.namedItem('confirmPassword') as HTMLInputElement
      ).value,
      gender: (form.elements.namedItem('gender') as HTMLInputElement)
        .value as Gender,
      picture: pictureBase64,
      acceptTnC: (form.elements.namedItem('acceptTnC') as HTMLInputElement)
        .checked,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
    });

    form.reset();
    setTimeout(onClose, 500);
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 min-w-100"
    >
      <h2 className="text-3xl text-amber-200 text-center">
        Your human profile
      </h2>

      <div className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input className="btn pt-2" type="text" id="name" name="name" />
        {/* {errors.name && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.name.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="age">Age</label>
        <input className="btn pt-2" type="text" id="age" name="age" />
        {/* {errors.age && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.age.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input className="btn pt-2" type="email" id="email" />
        {/* {errors.email && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.email.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="btn pt-2"
          type="password"
          id="password"
          name="password"
        />
        {/* {errors.password && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.password.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          className="btn pt-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
        />
        {/* {errors.confirmPassword && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.confirmPassword.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender">Gender</label>
        <select className="btn" id="gender" name="gender">
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        {/* {errors.gender && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.gender.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="picture">Picture</label>
        <input
          className="btn pt-2"
          type="file"
          accept="image/png, image/jpeg"
          id="picture"
          name="picture"
        />
        {/* {errors.picture && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.picture.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label htmlFor="country">Country</label>
        <select id="country" className="btn" name="country">
          <option value="">-- Select a country --</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {/* {errors.country && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.country.message}
          </span>
        )} */}
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="acceptTnC"
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <input
            id="acceptTnC"
            type="checkbox"
            className="peer hidden"
            name="acceptTnC"
          />
          <div className="w-5 h-5 bg-black border-2 border-amber-300 rounded-full flex items-center justify-center peer-checked:bg-yellow-400"></div>
          Accept Terms and Conditions
        </label>
        {/*
        {errors.acceptTnC && (
          <span className="text-xs text-amber-100 h-0 text-end">
            You must accept T&C
          </span>
        )} */}
      </div>

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
