import Card from '@/components/Card/Card';
import { useFormStore } from '@/store/useFormStore';

const Members = () => {
  const members = useFormStore((state) => state.users);
  return (
    <div className="flex flex-wrap gap-4">
      {members.length > 0 &&
        members.map((user, index) => <Card key={index} {...user} />)}
    </div>
  );
};

export default Members;
