export function Page({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-white-100 font-sans items-center flex-col justify-between h-screen">
      <div className="flex items-center flex-col pt-10">{children}</div>
    </div>
  );
}
