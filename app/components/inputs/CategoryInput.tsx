'use client'
import { IconType } from "react-icons";

interface CategoryInputProps {
    selected: boolean;
    label: string;
    icon: IconType;
    onClick: (value: string) => void;
}

function CategoryInput({ selected, label, icon: Icon, onClick }: CategoryInputProps) {
    return (
        <div onClick={() => onClick(label)} className={`rounded-xl border-2 p-4 flex flex-col gap-3 hover:border-black transition cursor-pointer ${selected ? 'border-black' : 'border-neutral-200'}`}>
            <Icon color={`${selected? 'black' : 'gray' }`} size={30} />
            <div className={`${selected ? 'font-weight-bold color-black':'color-gray' }`}>{label}</div>
        </div>
    )
}

export default CategoryInput