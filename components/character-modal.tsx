interface Episode {
  id: string;
  name: string;
  episode: string;
}

interface Location {
  name: string;
}

interface Character {
  id: string;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Location;
  location: Location;
  image: string;
  episode: Episode[];
}

interface CharacterModalProps {
  character: Character;
  onClose: () => void;
}

export function CharacterModal({ character, onClose }: CharacterModalProps) {
  const getBadgeClass = () => {
    if (character.status === 'Alive') return 'badge-alive';
    if (character.status === 'Dead') return 'badge-dead';
    return 'badge-unknown';
  };

  return (
    <div className="modal-overlay p-2 sm:p-4" onClick={onClose}>
      <div
        className="modal-content relative max-h-[95vh] sm:max-h-[90vh] max-w-4xl overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute right-2 top-2 sm:right-4 sm:top-4 z-10 rounded-full bg-white/90 p-2 text-zinc-900 transition-colors hover:bg-white active:bg-zinc-100 dark:bg-zinc-800/90 dark:text-zinc-50 dark:hover:bg-zinc-800 touch-manipulation"
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="relative h-32 sm:h-48 md:h-64 w-full overflow-hidden">
          <img
            src={character.image}
            alt={character.name}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-zinc-900"></div>
        </div>

        <div className="p-4 sm:p-6 md:p-8">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-50">
                {character.name}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <span className={getBadgeClass()}>
                  {character.status}
                </span>
                <span className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
                  {character.species} • {character.gender}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="detail-grid">
              <div>
                <p className="text-label">Species</p>
                <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {character.species}
                </p>
              </div>
              
              <div>
                <p className="text-label">Gender</p>
                <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {character.gender}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-label">Origin</p>
                <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {character.origin.name}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-label">Last Known Location</p>
                <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  {character.location.name}
                </p>
              </div>

              {character.type && (
                <div className="sm:col-span-2">
                  <p className="text-label">Type</p>
                  <p className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                    {character.type}
                  </p>
                </div>
              )}
            </div>

            {/* Episodes */}
            {character.episode.length > 0 && (
              <div>
                <h3 className="mb-2 text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Episodes ({character.episode.length})
                </h3>
                <div className="max-h-64 overflow-y-auto space-y-2">
                  {character.episode.slice(0, 10).map((episode) => (
                    <div key={episode.id} className="rounded-lg bg-zinc-50 p-3 dark:bg-zinc-800">
                      <p className="font-semibold text-zinc-900 dark:text-zinc-50 text-sm">
                        {episode.episode}
                      </p>
                      <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                        {episode.name}
                      </p>
                    </div>
                  ))}
                  {character.episode.length > 10 && (
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center py-2">
                      + {character.episode.length - 10} more episodes
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
