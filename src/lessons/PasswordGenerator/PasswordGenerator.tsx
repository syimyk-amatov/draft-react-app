import { useCallback, useEffect, useState } from "react";
import "./PasswordGenerator.scss";

export const PasswordGenerator = () => {
  const [passwordHistory, setPasswordHistory] = useState<string[]>([]);
  const [passwordLength, setPasswordLength] = useState(8);
  const [currentPassword, setCurrentPassword] = useState<string | null>(null);

  const generatePassword = useCallback(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";
    let newPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCurrentPassword(newPassword);
    setPasswordHistory((prev) => [newPassword, ...prev].slice(0, 5));
  }, [passwordLength]);

  const onPasswordLengthChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newLength = parseInt(event.target.value, 10);
    if (!isNaN(newLength)) {
      setPasswordLength(newLength);
    }
  };

  useEffect(() => {
    generatePassword();
  }, [generatePassword]);

  return (
    <div className="password-generator">
      <h2>Password Generator</h2>

      <div className="password-generator__controls">
        <label htmlFor="length">Length:</label>
        <input type="number" id="length" min="4" max="32" value={passwordLength} onChange={onPasswordLengthChange} step="1" />
      </div>

      <div className="password-generator__current">{currentPassword}</div>

      <button type="button" className="password-generator__button" onClick={generatePassword}>
        Generate
      </button>

      {passwordHistory.length > 0 && (
        <div className="password-generator__history">
          <h3>History:</h3>
          <ul>
            {passwordHistory.map((pwd, index) => (
              <li key={index + pwd}>{pwd}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
