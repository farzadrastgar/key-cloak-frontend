import React from "react";

const SettingsSection: React.FC<{
    title: string;
    children: React.ReactNode;
}> = ({ title, children }) => {
    return (
        <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            <div className="space-y-4">{children}</div>
        </section>
    );
};

export default SettingsSection;