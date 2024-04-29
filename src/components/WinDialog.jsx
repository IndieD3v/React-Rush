import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

function WinDialog(props) {
    return (
        <Dialog open={true} className="z-10">
            <DialogContent className="grid gap-10 z-50">
                <div className={`text-center text-4xl tracking-widest shadow-xl shadow-${props.tag.backgroundColor}/20 ${props.tag.backgroundColor} text-white py-5 w-full absolute -translate-y-[100%] rounded-t-lg`}>
                    {props.tag.tag}
                </div>


                <div className='flex flex-row justify-between items-start tracking-normal'>
                    <div>
                        <p>Phase {props.currentPhase} / 5</p>
                        <p className='text-4xl'>Completed</p>
                    </div>
                </div>

                {props.currentPhase + 1 >= 6 && (
                    <>
                        <div className='flex flex-col text-md items-start tracking-normal'>
                            {props.allCompletionTime.map((completionTime, i) =>
                                <div className='flex flex-row w-full justify-between'>
                                    <p>Phase {i + 1}</p>
                                    <p >{completionTime}s</p>
                                </div>
                            )}
                        </div>
                    </>
                )}

                <hr className='h-px bg-slate-400 border-0'></hr>

                <div className='flex flex-row justify-between items-end'>
                    <div className='tracking-normal'>

                        {props.currentPhase + 1 >= 6 ? (
                            <div>
                                <span className='text-xl opacity-100 font-medium tracking-tighter'>Total time</span>

                                <p className='text-6xl tracking-tighter'>{(props.allCompletionTime.reduce((a, b) => a + b, 0)).toFixed(2)}<span className='text-3xl mx-2 opacity-40'>s</span></p>
                            </div>
                        ) :
                            <p className='text-6xl tracking-tighter'>{props.completionTime}<span className='text-3xl mx-2 opacity-40'>s</span></p>
                        }
                    </div>

                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button onClick={props.onClick} type="button" variant="gameStartButton" className='bg-emerald-500 font-normal shadow-xl shadow-emerald-500/30 tracking-tighter gap-5 text-2xl px-6 py-3'>
                                {props.currentPhase + 1 >= 6 ? (
                                    <>
                                        PLAY AGAIN

                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                        </svg>
                                    </>
                                ) : (
                                    <>
                                        NEXT
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                        </svg>
                                    </>
                                )}
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>

    )
}

export default WinDialog