import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,getAuth,signOut } from "firebase/auth";

export const SignUpWithGoogle = async () => {

    try {
        const provider = new GoogleAuthProvider();

    const result=await signInWithPopup(auth, provider)
     
       
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (!credential){
            console.error("Error in user Credential")
            return
        }
        const token = credential.accessToken;
        const user = result.user;
        console.log(user,token);
       
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);

    }
  };

export const SignupWithEmail = async (e) => {
    e.preventDefault()
    if (!email || !password) {
        console.error("Provide Email and Password");
        return;
    }
    try {
        const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
        );

        const user = userCredential.user;
        console.log(user);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log("errorCode:", errorCode, "errorMessage:", errorMessage);
    }
};

export const SignInWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      console.error("Provide Email and Password");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;
      console.log(user);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log("errorCode:", errorCode, "errorMessage:", errorMessage);
    }
};

export const userSignOut = async (e: React.FormEvent) => {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
}