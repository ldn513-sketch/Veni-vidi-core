# Veni Vidi Core - Android Deployment Guide

This guide explains how to build and deploy the Android version of Veni Vidi Core using GitHub Actions.

## 🚀 Quick Start

1.  **Push to GitHub**: Upload this entire project to a new GitHub repository.
2.  **Enable Actions**: Go to the "Actions" tab in your repository and ensure workflows are enabled.
3.  **Trigger Build**:
    *   Push a commit to the `main` branch.
    *   OR go to Actions > "Build Android APK" > "Run workflow".
4.  **Download APK**: Once the build finishes (green checkmark), click on the workflow run and download the `veni-vidi-core-debug.apk` artifact.

## 🛠 Local Development (Optional)

If you want to build the APK on your own machine (requires Android Studio):

1.  **Install Dependencies**:
    ```bash
    pnpm install
    ```

2.  **Build Web Assets**:
    ```bash
    pnpm build
    ```

3.  **Sync with Android Project**:
    ```bash
    npx cap sync android
    ```

4.  **Open in Android Studio**:
    ```bash
    npx cap open android
    ```
    From there, you can run the app on an emulator or connected device.

## 📦 Architecture

*   **Capacitor**: Bridges the web app (React/Vite) to the native Android layer.
*   **Offline-First**: The app bundles all assets. The Service Worker handles caching for OSM tiles and plugins.
*   **Plugins**: Run inside sandboxed iframes, communicating with the native shell via the same `postMessage` API used in the web version.

## 📝 License

This project is licensed under the GNU General Public License v3.0 (see [LICENSE](LICENSE)).
