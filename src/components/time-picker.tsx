import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Clock9 as TimeIcon } from 'lucide-react';
import { Meridiem } from '@/dto';
import { cn } from '@/lib/utils';

interface TimePickerProps {
  meridiem: Meridiem | undefined;
  hour: number | undefined;
  minute: number | undefined;
  setMeridiem: Dispatch<SetStateAction<Meridiem | undefined>>;
  setHour: Dispatch<SetStateAction<number | undefined>>;
  setMinute: Dispatch<SetStateAction<number | undefined>>;
}

export function TimePicker({
  meridiem,
  hour,
  minute,
  setMeridiem,
  setHour,
  setMinute,
}: TimePickerProps) {
  const meridiems = [Meridiem.AM, Meridiem.PM];
  const hours = (() => {
    const hours = [];
    for (let i = 0; i < 12; i++) {
      hours.push(i);
    }
    return hours;
  })();
  const minutes = (() => {
    const minutes = [];
    for (let i = 0; i < 60; i++) {
      minutes.push(i);
    }
    return minutes;
  })();

  const hoursScrollArea = useRef<null | HTMLDivElement>(null);
  const minutesScrollArea = useRef<null | HTMLDivElement>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);

  const handleOpen = (open: boolean) => {
    if (hour === undefined) {
      // Set hour as current hour
      const currentHour = new Date().getHours();
      setHour(currentHour > 12 ? currentHour - 12 : currentHour);
    }

    if (minute === undefined) {
      // Set minute as current minute
      setMinute(new Date().getMinutes());
    }

    if (meridiem === undefined) {
      // Set meridiem as current meridiem
      setMeridiem(new Date().getHours() >= 12 ? Meridiem.PM : Meridiem.AM);
    }

    setPopoverOpen(open);
  };

  useEffect(() => {
    if (!popoverOpen) return;

    if (hour && hoursScrollArea.current) {
      const selectedHourElement = hoursScrollArea.current.querySelector(
        `[data-hour="${hour}"]`
      );

      if (selectedHourElement) {
        selectedHourElement.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        });
      }
    }

    if (minute && minutesScrollArea.current) {
      const selectedMinuteElement = minutesScrollArea.current.querySelector(
        `[data-minute="${minute}"]`
      );
      if (selectedMinuteElement) {
        selectedMinuteElement.scrollIntoView({
          behavior: 'instant',
          block: 'center',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [popoverOpen]);

  return (
    <Popover onOpenChange={handleOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            hour === undefined && minute === undefined && 'text-zinc-400'
          )}
        >
          <TimeIcon className='mr-2 h-4 w-4' />
          <span>
            {hour === undefined && minute === undefined
              ? 'Pick a time'
              : `${hour}:${minute} ${meridiem}`}
          </span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0 mr-2'>
        <div className='flex'>
          {/* HOURS */}
          <div className='px-2 py-2 flex flex-col gap-2 border-r dark:border-r-zinc-700 border-r-zinc-300'>
            <small className='text-sm text-center font-medium leading-none text-zinc-400'>
              Hour
            </small>
            <ScrollArea className='h-72 w-24 rounded-md' ref={hoursScrollArea}>
              {hours.map((h) => (
                <Button
                  key={h}
                  className='w-full text-lg'
                  data-hour={h}
                  variant={hour === h ? 'default' : 'ghost'}
                  onClick={() => setHour(h)}
                >
                  {h}
                </Button>
              ))}
            </ScrollArea>
          </div>
          {/* MINUTES */}
          <div className='px-2 py-2 flex flex-col gap-2 border-r dark:border-r-zinc-700 border-r-zinc-300'>
            <small className='text-sm text-center font-medium leading-none text-zinc-400'>
              Minutes
            </small>
            <ScrollArea
              className='h-72 w-24 rounded-md'
              ref={minutesScrollArea}
            >
              {minutes.map((m) => (
                <Button
                  key={m}
                  className='w-full text-lg'
                  data-minute={m}
                  variant={minute === m ? 'default' : 'ghost'}
                  onClick={() => setMinute(m)}
                >
                  {m}
                </Button>
              ))}
            </ScrollArea>
          </div>
          {/* AM/PM */}
          <div className='px-2 py-2 flex flex-col gap-2'>
            {meridiems.map((m) => {
              return (
                <Button
                  key={m}
                  size='sm'
                  variant={meridiem === m ? 'default' : 'secondary'}
                  onClick={() => setMeridiem(m)}
                >
                  {m}
                </Button>
              );
            })}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
