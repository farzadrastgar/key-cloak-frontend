import { useState } from "react";
import type { User } from "../../users/types/user.types";
import type { Organization } from "../../organizations/types";
import SelectedEmails from "./SelectedEmails";
import { useSendInvitations } from "../api/invitations.queries";
import { OrganizationSelect } from "../../organizations/components/OrganizationSelect";
import { toast } from "sonner";
import { Button } from "../../../shared/components/ui/Button";

export default function InvitationPanel({
    selectedUsers,
    setSelectedUsers,
}: {
    selectedUsers: User[];
    setSelectedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}) {
    const [manualEmails, setManualEmails] = useState("");
    const [selectedOrg, setSelectedOrg] = useState<Organization | null>(null);

    const { mutate, isPending } = useSendInvitations();

    const selectedEmails = selectedUsers.map((u) => u.email);

    const parsedManualEmails = manualEmails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean);

    const allEmails = Array.from(
        new Set([...selectedEmails, ...parsedManualEmails])
    );

    // ✅ remove email (both from users + manual)
    const handleRemoveEmail = (email: string) => {
        // remove from selected users
        setSelectedUsers((prev) =>
            prev.filter((u) => u.email !== email)
        );

        // remove from manual input
        const updatedManual = parsedManualEmails.filter(
            (e) => e !== email
        );
        setManualEmails(updatedManual.join(", "));
    };

    const handleSubmit = () => {
        if (!allEmails.length) {
            toast.error("Please add at least one email");
            return;
        }

        if (!selectedOrg) {
            toast.error("Please select an organization");
            return;
        }

        mutate({
            emails: allEmails,
            organizationId: selectedOrg.id,
        }, {
            onSuccess: () => {
                // ✅ CLEAR EVERYTHING
                setManualEmails("");
                setSelectedOrg(null);
                setSelectedUsers([]);
            },
        });
    };

    return (
        <div className="flex-1 p-6 bg-white m-2 space-y-4">
            <h2 className="text-xl font-semibold text-blue-600">
                Users einladen
            </h2>

            {/* Manual input */}
            <div>
                <label className="text-sm text-gray-600">
                    Email Adressen eingeben
                </label>
                <textarea
                    className="w-full border rounded p-2 mt-1"
                    rows={4}
                    placeholder="email1@test.com, email2@test.com"
                    value={manualEmails}
                    onChange={(e) => setManualEmails(e.target.value)}
                />
            </div>

            {/* Selected emails (click to remove) */}
            <SelectedEmails
                emails={allEmails}
                onRemove={handleRemoveEmail} // 👈 NEW
            />

            {/* ✅ Organization moved BELOW emails */}
            <div>
                <label className="text-sm text-gray-600">
                    Organisation auswählen
                </label>
                <div className="mt-1">
                    <OrganizationSelect
                        value={selectedOrg}
                        onChange={setSelectedOrg}
                    />
                </div>
            </div>

            {/* Submit */}
            <div className="flex justify-end">
                <Button
                    onClick={handleSubmit}
                    loading={isPending}
                    disabled={isPending || !selectedOrg || allEmails.length === 0}
                    className="px-6 py-2 rounded"
                    variant="primary"
                >
                    Einladen
                </Button>
            </div>
        </div>
    );
}