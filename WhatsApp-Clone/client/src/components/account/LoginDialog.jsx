import { Dialog,Box,Typography,List,ListItem,styled } from "@mui/material"
import {GoogleLogin} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import { AccountContext } from "../../context/AccountProvider";
import { qrCodeImage } from "../../constant/data"
import { useContext } from "react";
import { addUser } from "../../service/api";


const Component=styled(Box)`
    display:flex;
`;


const QRCode=styled('img')({
    height:264,
    width:264,
    margin:'50px 0 0 50px',
    marginLeft: '250px',
})

const Title=styled(Typography)`
    font-size:26px;
    color:#525252;
    font-weight:300;
    font-family:inherit;
    margin-bottom:25px;
`
const StyledList=styled(List)`
    &>li{
        padding:0;
        margin-top:15px;
        font-size:18px;
        line-height:20px;
        color:#4A4A4A;
    }
`
const Container=styled(Box)`
    padding:56px 0 56px 56px;
`;


const dialogStyle={
    height:'96%',
    marginTop:'12%',
    width:'60%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    overFlow:'hidden',
}


const LoginDialog=()=>{

    const {setAccount}=useContext(AccountContext)

    const onLoginSuccess=async (res)=>{
        //console.log('onLoginSuccess');
        //console.log(res);
        //console.log("res.credential: "+res.credential);
        const decode=jwtDecode(res.credential);
        console.log(decode);
        setAccount(decode);
        await addUser(decode)
    }
    const onLoginError=(res)=>{
        console.log('onLoginError');
        console.log(res);
    }

    return(
        <>
            <Dialog open={true} PaperProps={{sx:dialogStyle}} hideBackdrop={true}>
                <Component>
                    <Container>
                        
                        <Title>To use whatsApp on your computer:</Title>
                        
                        <StyledList>
                            <ListItem>1. Open WhatsApp on your phone</ListItem>
                            <ListItem>2. Tap Menu Settings and select WhatsApp Web</ListItem>
                            <ListItem>3. Point your phone to this scrren to capture the code</ListItem>
                            
                        </StyledList>
                    </Container>
                    <Box style={{position:'relative'}}>
                        <QRCode src={qrCodeImage} alt="qr code" />
                        <Box style={{position:'absolute',top:'50%',transform:"translateX(120%"}}>
                            <GoogleLogin 
                            onSuccess={onLoginSuccess}
                            onError={onLoginError}
                            />
                        </Box>
                    </Box>
                </Component>
            </Dialog>
        </>
    )
}

export default LoginDialog