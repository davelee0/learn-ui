import { useState, useRef, useEffect } from 'react';
import { DemoContainer } from '../ui/DemoContainer';

const FRUITS = [
  { id: 'apple', label: 'Apples' },
  { id: 'banana', label: 'Bananas' },
  { id: 'cherry', label: 'Cherries' },
  { id: 'dragonfruit', label: 'Dragonfruit' },
];

export default function CheckboxDemo() {
  const [disabled, setDisabled] = useState(false);
  const [singleChecked, setSingleChecked] = useState(false);
  const [checkedFruits, setCheckedFruits] = useState<Record<string, boolean>>({
    apple: true,
    banana: false,
    cherry: true,
    dragonfruit: false,
  });

  const parentRef = useRef<HTMLInputElement>(null);

  const allChecked = FRUITS.every((f) => checkedFruits[f.id]);
  const noneChecked = FRUITS.every((f) => !checkedFruits[f.id]);
  const isIndeterminate = !allChecked && !noneChecked;

  useEffect(() => {
    if (parentRef.current) {
      parentRef.current.indeterminate = isIndeterminate;
    }
  }, [isIndeterminate]);

  const handleParentChange = () => {
    const newValue = !allChecked;
    const updated: Record<string, boolean> = {};
    FRUITS.forEach((f) => {
      updated[f.id] = newValue;
    });
    setCheckedFruits(updated);
  };

  const handleFruitChange = (id: string) => {
    setCheckedFruits((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = FRUITS.filter((f) => checkedFruits[f.id]).length;

  return (
    <DemoContainer
      controls={
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-xs text-gray-600">
            <input
              type="checkbox"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="rounded border-gray-300"
            />
            Disabled
          </label>
        </div>
      }
      tips={[
        'The indeterminate state (dash icon) only exists visually -- it must be set via JavaScript, not HTML attributes.',
        'Clicking the "Select all" parent checkbox cycles between all-checked and none-checked.',
        'Each label wraps or is associated with its checkbox, so clicking the text also toggles the checkbox.',
        'Checkbox groups use fieldset/legend for proper screen reader grouping.',
      ]}
    >
      <div className="w-full max-w-md space-y-8">
        {/* Single checkbox */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Single Checkbox
          </h3>
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={singleChecked}
              onChange={(e) => setSingleChecked(e.target.checked)}
              disabled={disabled}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
            />
            <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
              I agree to the terms and conditions
            </span>
          </label>
          <p className="mt-1 ml-7 text-xs text-gray-400">
            Value: {singleChecked ? 'checked' : 'unchecked'}
          </p>
        </div>

        {/* Checkbox group with indeterminate parent */}
        <div>
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
            Checkbox Group with Indeterminate Parent
          </h3>
          <fieldset disabled={disabled}>
            <legend className="sr-only">Select fruits</legend>

            {/* Parent checkbox */}
            <label className="flex items-center gap-3 cursor-pointer select-none mb-2 pb-2 border-b border-gray-200">
              <input
                ref={parentRef}
                type="checkbox"
                checked={allChecked}
                onChange={handleParentChange}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
              />
              <span className={`text-sm font-medium ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                Select all fruits
              </span>
              <span className="text-xs text-gray-400 ml-auto">
                {checkedCount} of {FRUITS.length} selected
              </span>
            </label>

            {/* Children checkboxes */}
            <div className="ml-6 space-y-2">
              {FRUITS.map((fruit) => (
                <label
                  key={fruit.id}
                  className="flex items-center gap-3 cursor-pointer select-none"
                >
                  <input
                    type="checkbox"
                    checked={checkedFruits[fruit.id]}
                    onChange={() => handleFruitChange(fruit.id)}
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 disabled:opacity-50"
                  />
                  <span className={`text-sm ${disabled ? 'text-gray-400' : 'text-gray-700'}`}>
                    {fruit.label}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
          <p className="mt-2 text-xs text-gray-400">
            Parent state: {allChecked ? 'checked' : noneChecked ? 'unchecked' : 'indeterminate'}
          </p>
        </div>
      </div>
    </DemoContainer>
  );
}
