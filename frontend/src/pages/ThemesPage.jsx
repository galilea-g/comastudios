import { useEffect } from 'react';
import { useThemes } from '../context/ThemeContext';
import ThemeCard from '../components/ThemeCard'
import { ButtonLink } from "../components/ui/ButtonLink";

function ThemePage(){
    const { getThemes, themes } = useThemes();

    useEffect(() => {
        getThemes()
    },[])

    if(themes.length === 0){
        return (<h1>No themes yet</h1>)
    }

    return (
        
        <div>
            <header className='flex justify-between'>
                <h1 className='text-5xl font-bold justify-center'></h1>
                <div className="flex gap-x-2 items-center text-white">
                    <ButtonLink to="/theme/new" >Add Theme</ButtonLink>
                </div>
            </header>
            <div className='grid grid-cols-1 items-center justify-center'>
                <center><h1 className='text-5xl font-bold'>THEMES</h1></center>
            </div>
            
            
            <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-2 w-full bg-center'>
                {
                    themes.map(theme => (
                        <ThemeCard theme= {theme} key={theme._id}/>
                    ))
                }
            </div>
        </div>)
}

export default ThemePage;