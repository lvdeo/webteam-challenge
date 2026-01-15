import { ApolloError } from "@apollo/client";

interface ErrorDisplayProps {
  error: ApolloError;
}

export function ErrorDisplay({ error }: ErrorDisplayProps) {
  return (
    <div className="rounded-lg bg-red-50 p-6 dark:bg-red-950/20">
      <h3 className="text-lg font-semibold text-red-600 dark:text-red-400 mb-2">
        Error loading content
      </h3>
      <p className="text-sm text-red-600 dark:text-red-400 mb-3">
        {error.message}
      </p>
      {error.networkError && (
        <div className="mt-2 p-3 bg-red-100 dark:bg-red-950/40 rounded text-xs">
          <p className="font-semibold mb-1">Network Error:</p>
          <p className="text-red-700 dark:text-red-300">
            {error.networkError.message}
          </p>
        </div>
      )}
      {error.graphQLErrors && error.graphQLErrors.length > 0 && (
        <div className="mt-2 p-3 bg-red-100 dark:bg-red-950/40 rounded text-xs">
          <p className="font-semibold mb-1">GraphQL Errors:</p>
          {error.graphQLErrors.map((err, i) => (
            <p key={i} className="text-red-700 dark:text-red-300">
              {err.message}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
