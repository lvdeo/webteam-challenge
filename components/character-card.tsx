interface Location {
  name: string;
}

interface CharacterCardProps {
  id: string;
  name: string;
  status: string;
  species: string;
  location: Location;
  image: string;
  onClick: () => void;
}

export function CharacterCard({ name, status, species, location, image, onClick }: CharacterCardProps) {
  const getBadgeClass = () => {
    if (status === 'Alive') return 'badge-alive';
    if (status === 'Dead') return 'badge-dead';
    return 'badge-unknown';
  };

  return (
    <div className="card-interactive group w-full text-left">
      <div 
        className="relative aspect-[2/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900"
        onClick={onClick}
      >
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={getBadgeClass()}>
            {status}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 line-clamp-2 font-semibold text-zinc-900 dark:text-zinc-50">
          {name}
        </h3>
        <p className="mb-1 text-sm text-zinc-600 dark:text-zinc-400">
          {species}
        </p>
        {location.name && (
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            📍 {location.name}
          </p>
        )}
      </div>
    </div>
  );
}
