# AI Styling Guidelines

This guide is intended for GitHub Copilot and other AI assistants (as well as developers) to follow when writing SCSS styles and applying classes to React components in this project. Please strictly adhere to these rules.

## 1. File Structure & Imports
- Each isolated component must have its own style file with the `.scss` extension (e.g., `ComponentName.scss`), located in the same folder as the `.tsx` file.
- Styles should be imported directly into the component file: `import './ComponentName.scss';`.

## 2. Class Naming & Structure (BEM)
- **Do not** style elements using global HTML tags (`div`, `input`, `button`, `h1`). Always use classes.
- The root element of a component must have a unique class name describing its essence (e.g., `.chat-widget`).
- Child elements should be named relative to the root element following the BEM methodology (or similar scoping): `.chat-widget__header`, `.chat-widget__input`, `.chat-widget__message--sent`.
- SCSS nesting level must not exceed 2-3 levels deep.

## 3. Theme Support (Light / Dark)
- **Strictly forbidden:** Hardcoded HEX/RGB colors for backgrounds and text (e.g., `#ffffff`, `#000000`, `black`, `white`) are NOT allowed. Do not define local variables like `--bg-color: #fff` in `.scss` files and do not use class-bound themes like `.dark { ... }` in individual components.
- Rely EXCLUSIVELY on global CSS variables for automatic theme support. The project switches themes via an attribute like `[data-theme='dark']` on the root `/html`/`body`.
- **Allowed Global Variables:** You MUST use the following variables:
  - Backgrounds: `var(--color-bg-primary)`, `var(--color-bg-secondary)`
  - Text: `var(--color-text-primary)`, `var(--color-text-secondary)`
  - Accents/Buttons: `var(--color-primary)`, `var(--color-primary-hover)`, `var(--color-primary-active)`
  - Borders: `var(--color-border)`
  - Shadows: `var(--shadow-sm)`, `var(--shadow-md)`
- If global SCSS variables (breakpoints, mixins) are required, import them from `src/_variables.scss` (e.g., `@import '../../_variables.scss';`).

## 4. Layout & Positioning
- Primarily use `display: flex;` and `display: grid;` for laying out elements.
- Instead of using hardcoded `margin` to create spacing between adjacent elements, use the `gap` property.
- Center content using modern CSS features (`align-items`, `justify-content`, or `place-items`).

## 5. Interactive Elements
- All buttons (`button`), links (`a`), and input/textarea fields must have explicitly defined styles for `:hover`, `:focus` (or `:focus-visible`), and `:disabled` states.
- Always add smooth transitions (e.g., `transition: background-color 0.2s ease, opacity 0.2s ease;`).
- The `:disabled` state should be visually distinct (e.g., reduced `opacity`, `cursor: not-allowed`).

## Expected Output Example

**React (TSX):**
```tsx
import './Chat.scss';

export const Chat = () => {
  return (
    <div className="chat">
      <h1 className="chat__title">Chat</h1>
      <form className="chat__form">
        <input className="chat__input" type="text" />
        <button className="chat__submit-btn" type="submit">Send</button>
      </form>
    </div>
  );
};
```

**SCSS:**
```scss
.chat {
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: var(--bg-surface, #fff);
  color: var(--text-primary, #333);
  padding: 24px;
  border-radius: 8px;

  &__title {
    font-size: 1.5rem;
    margin: 0;
  }

  &__form {
    display: flex;
    gap: 8px;
  }

  &__input {
    flex: 1;
    padding: 8px 12px;
    border: 1px solid var(--border-color, #ccc);
    border-radius: 4px;
    background-color: var(--bg-input, #fff);
    color: var(--text-primary, #333);
    transition: border-color 0.2s;

    &:focus-visible {
      outline: none;
      border-color: var(--primary-color, #007bff);
    }
  }

  &__submit-btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    background-color: var(--primary-color, #007bff);
    color: #fff;
    cursor: pointer;
    transition: background-color 0.2s, opacity 0.2s;

    &:hover {
      opacity: 0.9;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
}
```