export default function NotFound() {
  return (
    <div className='grid place-items-center'>
      <div>
        <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center'>
          404!
          <br />
          Not found
        </h1>
        <p className='leading-7 [&:not(:first-child)]:mt-6 dark:text-zinc-500'>
          Make sure you have the correct link
        </p>
      </div>
    </div>
  );
}
