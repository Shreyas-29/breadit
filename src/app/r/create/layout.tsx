import React from 'react';


export const metadata = {
    title: 'Breadit - Create Community',
    description: 'Create a new community',
}


export default function CreatePageLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}

