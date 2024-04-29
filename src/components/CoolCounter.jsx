import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"

import axios from 'axios';

import wowEmoji from '../assets/wowEmoji.png'

const CoolCounter = () => {
    const category = "mtanmaymCoolThings"
    const projectName = "reactGame"

    const [count, setCount] = useState(69);
    const [isCountSet, setIsCountSet] = useState(false);

    const [isPageViewed, setIsPageViewed] = useState(false);


    const updateCountValue = async () => {
        axios.get(`https://api.counterapi.dev/v1/${category}/${projectName}Views/up`)
            .then(response => {
                setCount(response.data.count)
                setIsPageViewed(true)
            })
            .catch(error => console.error(error));
    }



    useEffect(() => {
        const setInitialCountValue = async () => {
            axios.get(`https://api.counterapi.dev/v1/${category}/${projectName}Views/set`)
        }

        const fetchInitialCount = async () => {
            axios.get(`https://api.counterapi.dev/v1/${category}/${projectName}Views`)
                .then(response => {
                    setIsPageViewed(true)
                    setCount(response.data.count)
                    // console.log(response)
                })
        }


        // Run this once before doing anything
        // setInitialCountValue();

        fetchInitialCount();

        // if (!isPageViewed) { pageViewsCount() }
    }, [])


    let formattedCount = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 4 }).format(count)


    return (
        <>
            <div className="absolute right-5 top-5 flex w-fit items-center justify-between bg-white rounded-full border border-gray-200 shadow-md max-md:order-2">
                <p className="text-sm ml-6 mr-5 font-medium max-md:mr-4">{formattedCount}</p>

                <Button onClick={updateCountValue} variant="outline" className="scale-[1.2] bg-white rotate-6 p-[0.3rem] hover:bg-slate-100 rounded-full shadow-xl hover:scale-[1.25] max-md:scale-110 transition-all ease-in-out duration-200 active:scale-105">
                    <img src={`/public/assets/wowEmoji.png`} width='25px' height='25px' />
                </Button>
            </div>
        </>
    )
}

export default CoolCounter