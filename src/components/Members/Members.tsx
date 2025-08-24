import Card from '@/components/Card/Card';
import { useFormStore } from '@/store/useFormStore';
import { useEffect, useState } from 'react';

const Members = () => {
  const members = useFormStore((state) => state.users);
  const { reset } = useFormStore((state) => state);
  const newlyAddedId = useFormStore((state) => state.newlyAddedId);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  useEffect(() => {
    if (newlyAddedId) {
      setHighlightedId(newlyAddedId);
      const timer = setTimeout(() => {
        setHighlightedId(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [newlyAddedId]);

  return (
    <div className="flex flex-col border-2 border-amber-300 rounded-md p-4 gap-4">
      <h2 className="text-center">🍞 Our Members 🍞</h2>
      <div>
        {members.length > 0 &&
          members.map((user) => (
            <div
              key={user.id}
              className={
                highlightedId === user.id ? 'border-2 border-amber-300' : ''
              }
            >
              <Card key={user.id} {...user} />
            </div>
          ))}
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
