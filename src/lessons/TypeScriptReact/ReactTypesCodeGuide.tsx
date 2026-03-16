import React, { 
  useState, 
  useRef, 
  useEffect, 
  useReducer,
  ReactNode, 
  ReactElement,
  Dispatch, 
  SetStateAction, 
  PropsWithChildren,
  ComponentPropsWithoutRef,
  CSSProperties
} from 'react';

// =========================================================================
// 1. ОТЛИЧИЕ: ReactNode vs ReactElement
// =========================================================================

/* 
  💡 ReactNode: Высший тип в иерархии рендеринга. 
  Обозначает ВСЁ, что React потенциально способен отрендерить на экран.
  Включает в себя: строку, число, boolean, null, undefined, ReactElement или массив этих типов.
*/
const ValidNode1: ReactNode = "Просто текст";
const ValidNode2: ReactNode = 12345;
const ValidNode3: ReactNode = null;
const ValidNode4: ReactNode = <div />;
const ValidNode5: ReactNode = [1, "Два", <span key="3" />];

/* 
  💡 ReactElement: Строгий тип. 
  Означает ТОЛЬКО объект, созданный через React.createElement() (то есть валидный JSX-тег).
  Он обязан иметь свойства type, props и key.
*/
const ValidElement: ReactElement = <div>Я JSX элемент</div>;
// ❌ ОШИБКА: const InvalidElement1: ReactElement = "Только текст"; 
// ❌ ОШИБКА: const InvalidElement2: ReactElement = null; 

// ИТОГ: 
// Используйте ReactNode для типизации пропса `children` (т.к. мы можем передать туда текст)
// Используйте ReactElement, когда ваш компонент требует строго передачу другого компонента (например, пропс `icon={<Icon />}`)


// =========================================================================
// 2. ВСТРОЕННЫЕ ТИПЫ ДЛЯ ПРОПСОВ И КОМПОНЕНТОВ (Built-in Types)
// =========================================================================

// 📌 PropsWithChildren:
// Утилитарный тип, который берет ваш интерфейс и автоматически добавляет в него опциональный `{ children?: ReactNode }`.
type ContentCardProps = PropsWithChildren<{
  title: string;
}>;

// Эквивалентно ручному написанию:
// interface ContentCardProps { title: string; children?: ReactNode; }

export const ContentCard = ({ title, children }: ContentCardProps) => (
  <section>
    <h2>{title}</h2>
    {children}
  </section>
);

// 📌 ComponentType (React.ComponentType<P>)
// Обозначает "ЛЮБОЙ компонент React". Под капотом это объединение: React.FC<P> | React.ComponentClass<P>
// Чаще всего используется при написании HOC (Higher-Order Components), когда вы не знаете, 
// какой компонент вам передадут - классовый или функциональный.
export function withLogger<P extends object>(WrappedComponent: React.ComponentType<P>) {
  return function ComponentWithLogger(props: P) {
    console.log("Рендерится новый компонент");
    return <WrappedComponent {...props} />;
  };
}

// 📌 ElementType (React.ElementType<P>)
// Ещё шире, чем ComponentType! Включает в себя ComponentType И нативные HTML-теги (строки типа 'div', 'span').
// Идеален для создания полиморфных компонентов (компонентов, которые могут менять свой корневой тег).
interface DynamicTextProps<As extends React.ElementType> {
  as?: As;
  children: React.ReactNode;
}

export function DynamicText<As extends React.ElementType = 'span'>({ 
  as, 
  children 
}: DynamicTextProps<As> & Omit<React.ComponentPropsWithoutRef<As>, keyof DynamicTextProps<As>>) {
  const Component = as || 'span';
  return <Component>{children}</Component>;
}
// Использование: <DynamicText as="h1">Заголовок</DynamicText>


// =========================================================================
// 3. РАСШИРЕНИЕ HTML-ЭЛЕМЕНТОВ (ComponentProps)
// =========================================================================

// При создании библиотек компонентов мы хотим, чтобы кастомная кнопка поддерживала все нативные html-пропсы (type, disabled, aria-*, etc)

// 📌 ComponentProps<'button'> - Извлекает все пропсы тега. Включает нативный `ref`.
// 📌 ComponentPropsWithoutRef<'button'> - Извлекает все пропсы, КРОМЕ `ref`. Идеально для компонентов, где вы не используете React.forwardRef.
// 📌 ComponentPropsWithRef<'button'> - Гарантирует наличие `ref`.

interface ButtonProps extends ComponentPropsWithoutRef<'button'> {
  variant?: 'primary' | 'danger';
}

export const Button = ({ variant = 'primary', className, ...rest }: ButtonProps) => {
  // Благодаря rest, эта кнопка примет onClick, onFocus, type="submit" и т.д.
  return <button className={`btn btn-${variant} ${className || ''}`} {...rest} />;
};


// =========================================================================
// 4. ТИПИЗАЦИЯ СОБЫТИЙ (Events)
// =========================================================================

export const EventDemo = () => {
  // 💡 В React у событий есть свои обертки (SyntheticEvent).
  // Главное правило: В дженерик <> мы передаем ТЕГ, на котором висит событие.

  // 1. onChange для полей ввода (input, textarea, select) - React.ChangeEvent
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value); // TS знает, что у e.target есть value
  };

  // 2. Клик мышью - React.MouseEvent
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(`Кликнули по x: ${e.clientX}, y: ${e.clientY}`);
  };

  // 3. Отправка формы - React.FormEvent
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // TS знает этот метод
  };

  // 4. События клавиатуры - React.KeyboardEvent
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') console.log("Нажат Enter");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} onKeyDown={handleKeyDown} />
      <Button onClick={handleClick}>Текст</Button>
    </form>
  );
};

// 📌 Альтернатива: Типизация самих функций (Event Handlers)
// Вместо (e: ChangeEvent<HTMLInputElement>) => void можно типизировать саму переменную:
const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
  console.log(e.target.value);
};


// =========================================================================
// 5. ХУКИ (Hooks) И СЛОЖНЫЕ СОСТОЯНИЯ
// =========================================================================

// 💡 useState и SetStateAction
// В качестве пропса для функции из useState используется тип Dispatch<SetStateAction<T>>.
// Это позволяет передавать как само значение (setState(1)), так и коллбэк (setState(prev => prev + 1)).
const CustomInput = ({ value, setValue }: { value: string, setValue: Dispatch<SetStateAction<string>> }) => {
  return <input value={value} onChange={e => setValue(e.target.value)} />;
};

// 💡 useRef: 2 разных варианта использования
const RefDemo = () => {
  // Вариант 1: Для хранения ссылки на DOM-элемент. 
  // ДОЛЖЕН БЫТЬ инициализирован `null` (иначе TS будет ругаться, что ref read-only).
  const inputRef = useRef<HTMLInputElement>(null);

  // Вариант 2: Для хранения мутабельного значения (setInterval, previous state).
  // Здесь мы храним setTimeout. Возвращаемый тип - NodeJS.Timeout.
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  return <input ref={inputRef} />;
};

// 💡 useReducer: Мощная типизация Actions
type AppState = { count: number };
// Использование Union Types для описания всех возможных действий (Actions)
type AppAction = 
  | { type: 'INCREMENT' }
  | { type: 'DECREMENT' }
  | { type: 'SET_VALUE', payload: number };

const reducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'INCREMENT': return { count: state.count + 1 };
    case 'DECREMENT': return { count: state.count - 1 };
    case 'SET_VALUE': return { count: action.payload }; // TS знает, что тут есть payload: number
    default: return state;
  }
};


// =========================================================================
// 6. СТИЛИ (CSSProperties)
// =========================================================================

// 💡 Объявление инлайн стилей
// Защищает от опечаток в названиях css-свойств и подсказывает валидные значения
const containerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  zIndex: 10
};

export default function TypeScriptGuideFile() {
  return <div style={containerStyle}>Шпаргалка готова!</div>;
}
