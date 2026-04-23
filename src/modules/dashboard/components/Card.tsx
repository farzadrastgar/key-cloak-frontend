import type { CardProps } from "../types/dashboard-ui.types";

function Card({ title, Icon, onClick }: CardProps) {
    return (
        <div
            onClick={onClick}
            className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center hover:shadow-lg transition cursor-pointer group"
        >
            <Icon className="w-10 h-10 mb-4 text-blue-600 group-hover:scale-110 transition" />
            <p className="font-medium text-gray-700 text-center">{title}</p>
        </div>
    );
}

export default Card;