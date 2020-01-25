# React Native App Setup

First, create a React Native app with this CLI.
```
react-native init MyApp --package=com.MyApp.MyApp

// or in newer version of CLI

npx react-native init MyApp 
```
Now, let's build IPA and APK of myApp project.

## iOS
**Step 1**
Open iOS project with Xcode using the following simple command from your root folder.
```
xed ./ios
```
**Step 2**
Now paste the following command in terminal
```
react-native bundle --entry-file index.js --platform ios --dev false --bundle-output ios/main.jsbundle --assets-dest ios
```

**Step 3**
Edit the scheme from Xcode like this:
- Product -> Scheme -> Edit Scheme
- Edit scheme to release

Now you have a stand-alone Xcode project and ready to build/release like native Xcode project.