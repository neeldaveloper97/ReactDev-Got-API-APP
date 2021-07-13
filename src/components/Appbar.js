import { useContext } from 'react';
import { ContextProvider } from './AppContext';
import './componentStyle.css'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


const Appbar = (props) =>{

    const {showBackButton} = useContext(ContextProvider);

    return(
        <div className="container-fluid bg-dark appbar-main">
            {
                showBackButton?(
                    <ArrowBackIcon onClick={()=>{window.location.href = "/"}} style={{color:'white'}}></ArrowBackIcon>
                ):null
            }
            <span className="titleStyle">
                Characters
            </span>
        </div>
    )
}

export default Appbar;