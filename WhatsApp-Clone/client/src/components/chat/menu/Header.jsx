import React from 'react'
import { useContext,useState } from 'react'
import { Box ,styled} from '@mui/material'
import {Chat as MessageIcon} from '@mui/icons-material'

//component
import { AccountContext } from '../../../context/AccountProvider'
import HeaderMenu from './HeaderMenu'
import InfoDrawer from '../../drawer/InfoDrawer'

const Component = styled(Box)`
    heigth:44px;
    background:#ededed;
    padding:8px 16px;
    display:flex;
    align-items:center;
`
const Wrapper=styled(Box)`
    margin-left:auto;
    & > *{
        margin-left:2px;
        padding:8px;
        color:#000;
    };

    &:first-child{
        margin-right:8px;
        margin-top:3px;
        font-size:22px;
    }
`




const Image=styled('img')({
    heigth:40,
    width:40,
    borderRadius:'50%'
})

const Header = () => {
  
    const [openDrawer, setOpenDrawer] = useState(false)
    const {account} =useContext(AccountContext)

    const toggleDrawer =()=>{
        setOpenDrawer(true) 
    }

    return (
    <>
        <Component>
            <Image src={account.picture} ali='dp' onClick={()=>toggleDrawer()} />
            <Wrapper>
                <MessageIcon />
                <HeaderMenu setOpenDrawer={setOpenDrawer}/>
            </Wrapper>
        </Component>
        
        <InfoDrawer open={openDrawer} setOpen={setOpenDrawer} />  
    </>
  )
}

export default Header