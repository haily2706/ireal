import Image from "next/image";
import { cn } from "@/lib/utils";

interface CoinProps {
    className?: string;
    size?: number;
}

export function Coin({ className, size = 24 }: CoinProps) {
    return (
        <Image
            src="/coin.svg"
            alt="Coin"
            width={size}
            height={size}
            className={cn("object-contain select-none pointer-events-none", className)}
        />
    );
}
