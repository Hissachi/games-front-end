import * as React from "react";

export default function Page({ children }: { children: React.ReactNode }) {
	return (
        <React.Suspense>
            <div className="px-1">{children}</div>
        </React.Suspense>
	);
}