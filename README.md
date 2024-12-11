# Greenspark Test

### Project Setup

```sh
npm install
```

### Copy .env.example to .env and fill the VITE_BASE_URL

```sh
VITE_BASE_URL=https://xxxxx.mock.pstmn.io
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Overview

This project provides a Vue.js-based widget customization app that enables users to view and customize product widgets. Users can:

- View product widgets.
- Modify widget properties such as color, active status, and whether they are linked to their public profile.
- Ensure that only one widget is active at a time.

The app is built using Vue.js and TypeScript, with Tailwind CSS for styling.

## Features

- **Widget Customization**: Users can alter the color, active state, and profile linking of widgets.
- **Single Active Widget**: Guarantees that only one widget can be active at a time.
- **Persistent State**: Widget settings are saved in `localStorage` to maintain preferences across sessions.
- **Responsive Design**: The interface is responsive, adapting to various screen sizes.
- **Reusability**: The app utilizes reusable Vue components for UI elements like checkboxes, toggles, and color pickers.

## Technical Details

- **Vue.js**: The app uses Vue.js for frontend development, with components managing different UI elements such as widget displays, settings, and customization options.
- **Tailwind CSS**: Tailwind is employed for styling, ensuring a clean and responsive layout.
- **Axios**: Axios is used to fetch widget data from a mock API.
- **TypeScript**: The project is written in TypeScript to provide type safety and enhance the development process.
- **LocalStorage**: Widget settings are stored in `localStorage` to persist user preferences.

## Project Structure

### 1. **Styles**

- **colors.css**: Defines the color variables used throughout the app.
- **custom.css**: Contains custom styles for the toggle components.
- **transitions.css**: Specifies transition effects for various elements.
- **style.css**: The primary CSS file that imports `colors.css`, `transitions.css`, and `custom.css` along with Tailwind CSS.

### 2. **Components**

#### SvgIcon.vue

This component dynamically loads and displays SVG icons based on the provided `name` prop. It uses Vue’s `defineAsyncComponent` to load icons asynchronously.

#### CheckboxComponent.vue

A customizable checkbox component that includes a label, icon, and hover effect. It emits an update event when the checkbox state changes.

#### ColorSwitchComponent.vue

A color selection component allowing users to choose from a set of predefined colors. It utilizes radio buttons and emits an update event when the color is changed.

#### ToggleComponent.vue

A toggle switch component that visually changes depending on its active state. Clicking on the toggle changes its state and triggers an update event.

#### TooltipComponent.vue

A tooltip component that displays additional information when users hover over an icon. It incorporates smooth transitions for visibility changes.

#### WidgetBadgeComponent.vue

Displays a badge for the widget showing a specific quantity (e.g., plastic bottles, kg of carbon). The badge's color and text update dynamically based on the widget data.

#### WidgetComponent.vue

This component renders a widget with a badge and settings. It emits an update event when the widget’s properties are modified and ensures only one widget is active at any time.

#### WidgetPanelComponent.vue

The container for displaying a list of widgets. It either fetches widget data from an API or `localStorage` and displays each widget via the `WidgetComponent`.

#### WidgetSettingComponent.vue

A settings component for customizing individual widgets, allowing users to toggle the active state, link to their public profile, and select the badge color.

### 3. **Constants**

#### colors.ts

Defines an array of predefined colors and a `ColorType` to ensure type safety when selecting colors.

### 4. **Interfaces**

#### WidgetInterface.ts

Defines the structure of a widget object, including properties like `id`, `type`, `amount`, `active`, `linked`, and `selectedColor`.

### 5. **App.vue**

The main entry point of the app, which displays the `WidgetPanelComponent` within a `main` container.
