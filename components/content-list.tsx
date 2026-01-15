"use client";

import { useQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GET_CHARACTERS } from "@/lib/graphql-queries";
import { Character, CharacterData } from "@/lib/types";
import { CharacterCard } from "./character-card";
import { CharacterModal } from "./character-modal";
import { Pagination } from "./pagination";
import { ErrorDisplay } from "./error-display";
import { LoadingSpinner } from "./loading-spinner";

export function ContentList() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  
  const [page, setPage] = useState(() => {
    const pageParam = searchParams.get('page');
    return pageParam ? parseInt(pageParam, 10) : 1;
  });

  useEffect(() => {
    const currentPage = searchParams.get('page');
    if (currentPage !== page.toString()) {
      router.push(`/information?page=${page}`, { scroll: false });
    }
  }, [page, router, searchParams]);

  const { loading, error, data } = useQuery<CharacterData>(GET_CHARACTERS, {
    variables: { page },
  });

  if (loading) return <LoadingSpinner />;
  if (error) {
    console.error('GraphQL Error:', error);
    return <ErrorDisplay error={error} />;
  }

  return (
    <>
      <div className="w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-zinc-900 dark:text-zinc-50">
            Rick and Morty Characters
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Explore characters from the multiverse
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {data?.characters.results.map((character) => (
            <CharacterCard
              key={character.id}
              {...character}
              onClick={() => setSelectedCharacter(character)}
            />
          ))}
        </div>

        {data?.characters.info && (
          <Pagination
            currentPage={page}
            totalPages={data.characters.info.pages}
            hasNext={!!data.characters.info.next}
            hasPrev={!!data.characters.info.prev}
            onPageChange={setPage}
          />
        )}
      </div>

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </>
  );
}
