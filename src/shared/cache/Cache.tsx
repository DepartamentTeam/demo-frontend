import type { ReactNode } from "react";
import { useState } from "react";

type Props = {
    children: ReactNode
}

export function Cache({children}: Props) {
    const _map = new WeakMap();
    const [map, setter] = useState(_map);
    return (
        <div data-cache={map}>
            {children}
        </div>
    );
}