export function VideoBackground() {
  return (
    <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-[-1]">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="w-full h-full object-cover filter grayscale"
        poster="/assets/images/backgrounds/team.jpg.webp"
        src="https://biznesport.pl/assets/images/astro1.mp4"
      />
      <div className="absolute inset-0 bg-white/90" />
    </div>
  );
}
