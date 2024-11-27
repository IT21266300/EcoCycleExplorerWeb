import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import progressHUD from 'progress-hud';

class GoogleSigninUtils {
  private static instance: GoogleSigninUtils;
  private isGoogleSignedIn = false;
  private constructor() {}

  // Singleton instance
  public static getInstance(): GoogleSigninUtils {
    if (!GoogleSigninUtils.instance) {
      GoogleSigninUtils.instance = new GoogleSigninUtils();
    }
    return GoogleSigninUtils.instance;
  }

  async signIn() {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      progressHUD.show();
      const {idToken} = await GoogleSignin.getTokens();
      if (!idToken) {
        throw new Error('Google Sign-In failed to retrieve idToken.');
      }

      const credential = auth.GoogleAuthProvider.credential(idToken);

      const firebaseUser = await auth().signInWithCredential(credential);

      this.isGoogleSignedIn = true;
      progressHUD.dismiss();

      return {userInfo, firebaseUser};
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('User cancelled the login flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Sign-in operation is already in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('Play services not available or outdated');
      } else {
        console.error('Error during sign-in:', error);
      }
      throw error;
    }
  }

  async getCurrentUser() {
    try {
      const currentUser = auth().currentUser;

      if (!currentUser) {
        console.log('No user is currently logged in.');
        return null; // No user is logged in
      }

      // Check if the user is logged in via Google
      const isGoogleLogin = currentUser.providerData.some(
        provider => provider.providerId === 'google.com',
      );

      let googleUserInfo = null;

      if (isGoogleLogin) {
        // Retrieve Google-specific user info
        googleUserInfo = await GoogleSignin.signInSilently();
      }

      // Consolidate user information
      const userDetails = {
        uid: currentUser.uid,
        displayName: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        providerId: currentUser.providerData[0]?.providerId,
        googleUserInfo, // Include additional Google user info if available
      };

      console.log('Current User Details:', userDetails);

      return userDetails;
    } catch (error: any) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.error('Error during retrieving current user:', error);
      }
      throw error;
    }
  }

  async signOut() {
    try {
      if (this.isGoogleSignedIn) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        console.log('Google account signed out');
      }

      await auth().signOut();
      this.isGoogleSignedIn = false;
      console.log('User signed out successfully');
    } catch (error) {
      console.error('Error during sign-out:', error);
      throw error;
    }
  }
}

export default GoogleSigninUtils.getInstance();
