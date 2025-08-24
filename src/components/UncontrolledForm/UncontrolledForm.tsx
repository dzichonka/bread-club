import { schema } from '@/validation/formSchema';
import { useCountryStore } from '@/store/useCountryStore';
import { useFormStore } from '@/store/useFormStore';
import type { Gender, IFormData } from '@/types/types';
import { useRef, useState, type FormEvent } from 'react';

type UncontrolledFormProps = {
  onClose: () => void;
};

const UncontrolledForm = ({ onClose }: UncontrolledFormProps) => {
  const { addUser } = useFormStore();
  const { countries } = useCountryStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
    const form = e.currentTarget;

    const fileInput = form.elements.namedItem('picture') as HTMLInputElement;
    const file = fileInput.files?.[0];
    let pictureBase64 = '';
    if (file) {
      pictureBase64 = await fileToBase64(file);
    }

    const formData = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      age: (form.elements.namedItem('age') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      password: (form.elements.namedItem('password') as HTMLInputElement).value,
      confirmPassword: (
        form.elements.namedItem('confirmPassword') as HTMLInputElement
      ).value,
      gender: (form.elements.namedItem('gender') as HTMLInputElement)
        .value as Gender,
      picture: fileInput.files,
      acceptTnC: (form.elements.namedItem('acceptTnC') as HTMLInputElement)
        .checked,
      country: (form.elements.namedItem('country') as HTMLInputElement).value,
    };

    const result = schema.safeParse(formData);

    if (!result.success) {
      const formErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          formErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(formErrors);
      return;
    }

    const data: IFormData = {
      ...formData,
      age: Number(formData.age),
      gender: formData.gender as Gender,
      picture: pictureBase64,
    };

    addUser(data);
    setErrors({});
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
        <input
          className="btn pt-2"
          type="text"
          id="name"
          name="name"
          required
        />
        {errors.name && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.name}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="age">Age</label>
        <input className="btn pt-2" type="text" id="age" name="age" required />
        {errors.age && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.age}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="email">Email</label>
        <input className="btn pt-2" type="email" id="email" required />
        {errors.email && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.email}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="password">Password</label>
        <input
          className="btn pt-2"
          type="password"
          id="password"
          name="password"
          required
        />
        {errors.password && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.password}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="confirmPassword">Confirm password</label>
        <input
          className="btn pt-2"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          required
        />
        {errors.confirmPassword && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.confirmPassword}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="gender">Gender</label>
        <select className="btn" id="gender" name="gender" required>
          <option value="male">male</option>
          <option value="female">female</option>
          <option value="other">other</option>
        </select>
        {errors.gender && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.gender}
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
          name="picture"
          required
        />
        {errors.picture && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.picture}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        <label htmlFor="country">Country</label>
        <select id="country" className="btn" name="country" required>
          <option value="">-- Select a country --</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        {errors.country && (
          <span className="text-xs text-amber-100 h-0 text-end">
            {errors.country}
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
            className="peer hidden"
            name="acceptTnC"
            required
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

      <button type="submit" className="btn">
        Submit
      </button>
    </form>
  );
};

export default UncontrolledForm;
