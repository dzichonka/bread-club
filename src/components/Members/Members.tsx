import Card from '@/components/Card/Card';
import { useFormStore } from '@/store/useFormStore';

const Members = () => {
  const members = useFormStore((state) => state.users);
  const { reset } = useFormStore((state) => state);
  return (
    <div className="flex flex-col border-2 border-amber-300 rounded-md p-4 gap-4">
      <h2 className="text-center">🍞 Our Members 🍞</h2>
      <div>
        {members.length > 0 &&
          members.map((user, index) => <Card key={index} {...user} />)}
      </div>
      <button
        className="btn"
        type="button"
        onClick={() => {
          reset();
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default Members;
