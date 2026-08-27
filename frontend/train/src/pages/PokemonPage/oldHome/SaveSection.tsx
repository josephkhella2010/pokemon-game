/* import { inputArr } from "../utilities/functios";
import type { inputArrValType } from "../utilities/interfaces";

interface PropsType {
  inputSaveVal: inputArrValType;
  handleSaveChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSave: () => void;
}

export default function SaveSection({
  inputSaveVal,
  handleSaveChange,
  handleSave,
}: PropsType) {
  return (
    <div>
      SaveSection
      <div>
        {inputArr &&
          inputArr.map((inp, index) => {
            return (
              <div key={index}>
                <label htmlFor={inp.name}>
                  <p>{inp.label}</p>
                  <input
                    type={inp.type}
                    placeholder={inp.placeholder}
                    name={inp.name}
                    id={inp.name}
                    value={
                      inputSaveVal[inp.name as keyof inputArrValType] ?? ""
                    }
                    onChange={(e) => handleSaveChange(e)}
                  />
                </label>
              </div>
            );
          })}
        <button onClick={() => handleSave()}> save</button>
      </div>
    </div>
  );
}
 */