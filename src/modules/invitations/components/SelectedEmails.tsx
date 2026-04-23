export default function SelectedEmails({
    emails,
    onRemove,
}: {
    emails: string[];
    onRemove?: (email: string) => void;
}) {
    return (
        <div className="border p-3 rounded bg-gray-50 min-h-[100px]">
            {emails.length === 0 ? (
                <p className="text-gray-400 text-sm">
                    No emails selected
                </p>
            ) : (
                <div className="flex flex-wrap gap-2">
                    {emails.map((email) => (
                        <span
                            key={email}
                            onClick={() => onRemove?.(email)}
                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded text-sm cursor-pointer hover:bg-red-100 hover:text-red-600"
                            title="Click to remove"
                        >
                            {email}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}