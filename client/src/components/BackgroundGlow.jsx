function BackgroundGlow() {
  return (
    <>
      <div className="absolute top-[-120px] left-[-120px] h-[300px] w-[300px] rounded-full bg-cyan-500/20 blur-3xl"></div>

      <div className="absolute bottom-[-120px] right-[-120px] h-[300px] w-[300px] rounded-full bg-blue-600/20 blur-3xl"></div>
    </>
  )
}

export default BackgroundGlow