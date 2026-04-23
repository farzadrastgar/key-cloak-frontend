import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import type { Organization } from "../types";
import { getOrganizationsRequest } from "../api";


interface Props {
    value?: Organization | null;
    onChange?: (org: Organization | null) => void;
    placeholder?: string;
}



export const OrganizationSelect: React.FC<Props> = ({
    value,
    onChange,
    placeholder = "Select organization...",
}) => {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");

    const containerRef = useRef<HTMLDivElement | null>(null);

    const { data = [], isLoading } = useQuery({
        queryKey: ["organizations", search],
        queryFn: () => getOrganizationsRequest(search),
        enabled: open, // fetch only when dropdown is open
    });

    const flatData = data;

    // close on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative w-full">
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="w-full border rounded-lg px-3 py-2 text-left bg-white hover:border-gray-400 focus:outline-none"
            >
                {value ? value.name : <span className="text-gray-400">{placeholder}</span>}
            </button>

            {/* Dropdown */}
            {open && (
                <div className="absolute z-50 mt-2 w-full rounded-lg border bg-white shadow-lg">
                    {/* Search */}
                    <div className="p-2 border-b">
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search organization..."
                            className="w-full px-2 py-1 border rounded focus:outline-none"
                        />
                    </div>

                    {/* List */}
                    <div className="max-h-60 overflow-y-auto">
                        {isLoading && (
                            <div className="p-2 text-sm text-gray-500">Loading...</div>
                        )}

                        {!isLoading && flatData.length === 0 && (
                            <div className="p-2 text-sm text-gray-500">No organizations found</div>
                        )}

                        {flatData.map((org) => (
                            <div
                                key={org.id}
                                onClick={() => {
                                    onChange?.(org);
                                    setOpen(false);
                                }}
                                className={`px-3 py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-between ${value?.id === org.id ? "bg-gray-100" : ""
                                    }`}
                            >
                                <span>{org.name}</span>
                                {value?.id === org.id && (
                                    <span className="text-xs text-gray-500">✓</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

