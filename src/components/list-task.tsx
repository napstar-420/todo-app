import { Task } from '@/dto';
import { formatRelativeDateTime } from '@/helpers/format-datetime';
import { MdAccessTimeFilled } from 'react-icons/md';
import { Badge } from './ui/badge';

interface ListTaskProps {
  task: Task;
}

export default function ListTask({ task }: ListTaskProps) {
  const { dueDate, subtasksCount, tags, title, description } = task;
  return (
    <div className='bg-zinc-900 px-4 py-4 rounded-xl flex flex-col gap-2'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-4'>
          <h4 className='scroll-m-20 text-xl font-semibold tracking-tight'>
            {title}
          </h4>
          <Badge variant='secondary'>{subtasksCount} subtasks</Badge>
        </div>
        <div className='flex items-center gap-2 self-start'>
          <MdAccessTimeFilled />
          <small className='text-sm leading-none'>
            {formatRelativeDateTime(dueDate)}
          </small>
        </div>
      </div>
      <p className='text-xs dark:text-zinc-400'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum
        corrupti, vero ipsum doloremque impedit perspiciatis hic laborum sed cum
        eveniet exercitationem tempora? Fugiat, sunt magni.
      </p>
      <div className='mt-4 flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant={index % 2 === 0 ? 'secondary' : 'default'}
          >
            {tag}
          </Badge>
        ))}
      </div>
    </div>
  );
}
