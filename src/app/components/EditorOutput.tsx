'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import { FC } from 'react';

// we are here because we want to use dynamic imports in the client side
const Output = dynamic(async () => (await import('editorjs-react-renderer')).default, {
    ssr: false
});

interface EditorOutputProps {
    content: any;
}

const style = {
    paragraph: {
        fontSize: '0.875rem',
        lineHeight: '1.25rem',
    }
}

const renderers = {
    image: CustomImageRenderer,
    code: CustomCodeRenderer,
}

const EditorOutput: FC<EditorOutputProps> = ({
    content
}) => {
    return (
        <Output
            data={content}
            style={style}
            renderers={renderers}
            className='text-sm'
        />
    )
}

function CustomImageRenderer({ data }: any) {
    return (
        <div className='relative w-full min-h-[15rem]'>
            <Image
                src={data.file.url}
                alt={data.caption}
                fill
                className='w-full object-cover'
            />
        </div>
    )
}

function CustomCodeRenderer({ data }: any) {
    return (
        <pre className='bg-gray-800 p-4 rounded-md'>
            <code className='text-gray-100 text-sm'>
                {data.code}
            </code>
        </pre>
    )
}

export default EditorOutput
