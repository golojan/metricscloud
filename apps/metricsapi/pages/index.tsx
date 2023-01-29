export function Index() {
  return (
    <>
      <div className="relative w-screen h-screen bg-black">
        <h1 className="absolute top-[50%] w-[50%] mx-auto text-white text-xxl">api.metrics.ng</h1>
        <p>{process.env.NEXT_PUBLIC_MONGOOSE_URI}</p>
      </div>
    </>
  );
}

export default Index;
