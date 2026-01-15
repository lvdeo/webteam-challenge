export function Footer() {
    return (
        <footer className="fixed bottom-0 left-0 right-0 border-t border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
            <div className="mx-auto flex h-14 max-w-7xl items-center justify-center px-4">
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Version: <span className="font-semibold text-zinc-900 dark:text-zinc-50">v3.5</span>
                </p>
            </div>
        </footer>
    );
}
