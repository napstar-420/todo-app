import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IoMdCloseCircle } from "react-icons/io";
import { Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAxiosPrivate } from "@/hooks/use-axios-private";
import { Tag } from "@/dto";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import routes from "@/api/routes";
import config from "@/config";

interface TagsSelectProps {
  tags: string[];
  setTags: Dispatch<SetStateAction<string[]>>;
}

export function TagsSelect({ tags, setTags }: TagsSelectProps) {
  const axios = useAxiosPrivate();
  const tagsInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [resultTags, setResultsTags] = useState<Tag[]>([]);
  const [filteredResultTags, setFilteredResultTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [opacity, setOpacity] = useState<1 | 0>(0);
  const [display, setDisplay] = useState<'none' | 'block'>('none');

  const clearTag = (tag: string) => {
    tagsInput.current?.focus();
    setTags((prev) => prev.filter((prevTag) => prevTag !== tag));
  };

  const addTag = (tag: string) => {
    tagsInput.current?.focus();
    const isTagAlreadyExists = tags.findIndex((t) => t === tag) !== -1;

    if (
      !isTagAlreadyExists &&
      tags.length < config.TASK_MAX_TAGS_LIMIT &&
      tag.trim()
    ) {
      setTags([...tags, tag]);
    }
  };

  useEffect(() => {
    let timeoutID = null;
    if (isFocused) {
      setDisplay('block');
      timeoutID = setTimeout(() => setOpacity(1), 50);
    } else {
      setOpacity(0);
      timeoutID = setTimeout(() => setDisplay('none'), 200);
    }

    return () => clearTimeout(timeoutID);
  }, [isFocused]);

  useEffect(() => {
    if (query[query.length - 1] === ' ') {
      addTag(query);
      setQuery('');
    }

    const getTags = async () => {
      setLoading(true);
      try {
        const response = await axios.get(routes.TAGS, { params: { q: query } });
        setResultsTags(response.data);
      } finally {
        setLoading(false);
      }
    };

    const debounceID = setTimeout(getTags, 500);
    return () => clearTimeout(debounceID);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  useEffect(() => {
    setFilteredResultTags(
      resultTags.filter(({ name }) =>
        tags.findIndex((tag) => tag === name) === -1 ? true : false
      )
    );
  }, [resultTags, tags]);

  return (
    <div className='relative'>
      <Alert
        variant='destructive'
        className={`${
          tags.length === config.TASK_MAX_TAGS_LIMIT ? 'block' : 'hidden'
        } mb-2`}
      >
        <AlertTitle>Max Tags!</AlertTitle>
        <AlertDescription>
          You can add only {config.TASK_MAX_TAGS_LIMIT} tags per task.
        </AlertDescription>
      </Alert>
      <Label htmlFor='tags'>Tags</Label>
      <div className='mt-2 px-2 py-2 rounded-md flex flex-wrap items-center gap-2 w-full border dark:border-zinc-800'>
        {tags.map((tag, index) => (
          <Badge
            key={index}
            variant='secondary'
            className='gap-1 pl-2 pr-1 cursor-pointer'
            onClick={() => clearTag(tag)}
          >
            {tag}
            <IoMdCloseCircle className='text-lg' />
          </Badge>
        ))}
        <Input
          ref={tagsInput}
          id='tags'
          type='text'
          autoComplete='off'
          className='h-auto px-1 py-0 w-24 focus-visible:ring-0 border-none'
          placeholder='Add Tags'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
      <div
        className='px-4 py-2 dark:bg-zinc-900 transition-opacity mt-4 rounded-xl absolute w-full'
        style={{
          display,
          opacity,
        }}
      >
        <small className='text-sm font-medium leading-none'>Select Tags</small>
        <Separator className='my-2' />
        {loading ? (
          <p className='dark:text-zinc-500 flex items-center'>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Loading...
          </p>
        ) : filteredResultTags.length ? (
          <div className='flex flex-wrap gap-1'>
            {filteredResultTags.map(({ name }, index) => (
              <Button
                type='button'
                key={index}
                variant='default'
                size='sm'
                onClick={() => addTag(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        ) : (
          <p className='text-sm dark:text-zinc-600'>No tags found</p>
        )}
      </div>
    </div>
  );
}
