# rn_auth

# Secure Todo App

A **React Native** + **Expo** Todo application with device authentication support.

This app ensures that users can only access their todos after authenticating with **biometric (Face ID / Fingerprint)** or **device PIN/Password**. If authentication is not set up on the device, the app will show options to go to device settings to enable security.

---

## Features

- **Add, Edit, and Delete Todos**:
  - Users can manage their todos with an intuitive interface.
- **Device-Level Authentication**:
  - Supports biometric authentication (Fingerprint / Face ID).
  - Fallback to PIN/Password if biometrics are unavailable.
- **Automatic Authentication**:
  - Prompts for authentication when the app comes to the foreground.
- **Device Security Prompt**:
  - If device security is not set up, users are prompted to enable it via device settings.
- **Cross-Platform Support**:
  - Fully compatible with Android and iOS.

---

## Screens

1. **Home Screen**:
   - Displays a list of todos.
   - Includes an `AddTodo` component for adding new todos.
   - If device security is not set up, shows a message with a **Go to Settings** button.

2. **Device Security Prompt**:
   - If authentication is not enabled, users are prompted to enable it via device settings.

---

## Installation

### Prerequisites

- **Node.js** (v16 or higher recommended)
- **Expo CLI**: Install it globally using:
  ```bash
  npm install -g expo-cli
  ```

### Steps

1. Clone the repository:

   ```bash
   git clone <your-repo-url>
   cd rn_auth
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the app:

   ```bash
   expo start
   ```

---

## How It Works

1. **Authentication**:
   - The app uses `expo-local-authentication` to check if biometric or PIN/Password authentication is enabled.
   - If authentication is enabled, the user is prompted to authenticate when the app starts or comes to the foreground.
   - If authentication fails, access to todos is restricted.

2. **Device Security Prompt**:
   - If the device is not secured, the app displays a message prompting the user to enable security.
   - On Android, the app opens the **Security Settings** using `expo-intent-launcher`.
   - On iOS, the app opens the **Settings** app using `Linking.openSettings()`.

3. **Todo Management**:
   - Todos are displayed in a list using `FlatList`.
   - Users can add, edit, or delete todos via the `AddTodo` and `TodoItem` components.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

---

## Demo

### Home Screen
![Home Screen](path-to-screenshot.png)

### Device Security Prompt
![Device Security Prompt](path-to-screenshot.png)