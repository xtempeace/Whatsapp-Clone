import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    aud: {
        type: String,
        required: true
    },
    azp: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    email_verified: {
        type: Boolean,
        required: true
    },
    exp: {
        type: Number,
        required: true
    },
    family_name: {
        type: String,
        required: true
    },
    given_name: {
        type: String,
        required: true
    },
    iat: {
        type: Number,
        required: true
    },
    iss: {
        type: String,
        required: true
    },
    jti: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    nbf: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    sub: {
        type: String,
        required: true
    }
})

const user = mongoose.model('user', userSchema);

export default user;

/*
{
    "aud": "13292640327-q54ehdgn4qncc75neegf2g61gpm480qa.apps.googleusercontent.com",
    "azp": "13292640327-q54ehdgn4qncc75neegf2g61gpm480qa.apps.googleusercontent.com",
    "email": "lightajaysingh@gmail.com",
    "email_verified": true,
    "exp": 1723928074,
    "family_name": "Singh",
    "given_name": "Ajay",
    "iat": 1723924474,
    "iss": "https://accounts.google.com",
    "jti": "9cfba396bfecfa3b04578af42a2cc7e9da341777",
    "name": "Ajay Singh",
    "nbf": 1723924174,
    "picture": "https://lh3.googleusercontent.com/a/ACg8ocIm2BRMuePjKdee_0P8G1DsQxEJGRzX2iyAhjA8MfHUEuz62djF=s96-c",
    "sub": "103411919876093117354",
    
}
*/