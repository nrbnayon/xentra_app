# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.




-------------------
Push Notification Setup
🔔 How it works in each state
App State	What happens
Foreground	setNotificationHandler shows banner + plays sound; listener fires
Background	OS delivers it to tray; background task fires on Android
Terminated (cold start)	getLastNotificationResponse() catches the tap and deep-links
🛠️ One thing you need to do
The notification icon reference in 

app.json
 points to ./assets/images/notification-icon.png. Create a 96×96 all-white PNG with transparent background at that path. On Android, the system colorizes it with the #208AEF tint you've configured.

🔑 EAS / Production setup

-----------------------------------------
🚀 How to Use
Option A — <TranslatedText> (simplest, recommended):

import { TranslatedText } from '@/components/ui/TranslatedText';
<TranslatedText style={styles.title}>Hello World</TranslatedText>
<TranslatedText style={styles.btn}>Submit</TranslatedText>
Option B — 

useTranslation
 hook (for dynamic strings):

tsx
const { t, tAsync, changeLanguage, language } = useTranslation();
// Sync — instant from cache (triggers background fetch if not cached)
const label = t('Welcome back');
// Async — awaits API if needed  
const msg = await tAsync('Your order is ready');
// Batch — single API call for multiple strings
const [a, b, c] = await tBatch(['Home', 'Profile', 'Settings']);
// Switch language globally — all components update instantly
await changeLanguage('bn'); // Bengali
await changeLanguage('ar'); // Arabic
await changeLanguage('en'); // back to English
Option C — 

useLanguage
 directly (for full context access):

tsx
const { translate, currentLanguage, supportedLanguages } = useLanguage();
⚡ Zero-Flicker Design
First render: Shows original English text immediately (no blank)
Cache hit: Shows translated text on first render (instant)
Cache miss: Shows English → kicks background fetch → context ticks → re-renders with translation (typically < 200ms on first use, then cached forever)
💾 Cache Strategy
Runtime: In-memory Map (zero latency)
Persisted: AsyncStorage, 7-day TTL
On language change: Old cache cleared, common strings pre-warmed in background