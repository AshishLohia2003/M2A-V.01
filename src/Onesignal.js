import OneSignal from 'react-onesignal';

export default async function runOneSignal() {
    await OneSignal.init({
        appId: '1b26684d-0103-4376-97a6-4d5296fcb424',
        allowLocalhostAsSecureOrigin: true
    });
    OneSignal.showSlidedownPrompt();    
}