import { Loader2 } from 'lucide-react'
import React from 'react'

const Loader = () => {
    return (
        <div className='flex items-center justify-center w-full h-full bg-white/30 backdrop-blur-sm'>
            <div className='flex flex-col items-center gap-2'>
                <Loader2 className='w-5 h-5 text-orange-200 animate-spin' />
                <p className='text-sm text-orange-700'>Breadit</p>
            </div>
        </div>
    )
}

export default Loader
