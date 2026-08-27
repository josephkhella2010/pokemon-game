import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setAddProduct,
  setDeleteProduct,
  setUpdateProduct,
} from "../../../Store/slices/ProductSlice.js";
import SaveSection from "./SaveSection.js";
import type { inputArrValType } from "../../../utilities/interfaces.js";
import type { RootState } from "../../../Store/store.js";
import { inputArr } from "../../../utilities/functios.js";

export default function HomePage() {
  const [inputVal, setInputVal] = useState<inputArrValType>({
    name: "",
    description: "",
    price: null,
  });

  const [inputSaveVal, setInpuSavetVal] = useState<inputArrValType>({
    name: "",
    description: "",
    price: null,
  });

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [productId, setProductId] = useState<string | number>("");

  const { products } = useSelector((state: RootState) => state.productSlice);
  const dispatch = useDispatch();

  /* functions*/

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const copyInputs = { ...inputVal, [name]: value };
    setInputVal(copyInputs);
  };

  const handleAddProduct = () => {
    dispatch(setAddProduct(inputVal));
  };

  const handleDelete = (productId: number | string) => {
    dispatch(setDeleteProduct(productId));
  };

  const handleSaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const copyInputs = { ...inputSaveVal, [name]: value };
    setInpuSavetVal(copyInputs);
  };

  const handleEdit = (productId: number | string) => {
    setIsEdit(true);
    const findProduct = products.find((prod) => prod.id === productId);
    if (!findProduct) return;
    setInpuSavetVal(findProduct);
    setProductId(productId);
    //console.log(findProduct);
  };

  const handleSave = () => {
    setIsEdit(false);
    dispatch(
      setUpdateProduct({
        id: productId,
        product: inputSaveVal,
      }),
    );
  };
  //console.log("products", products);
  //console.log("inputVal", inputVal);

  const school = {
    name: "sund",
    student: [
      { name: "john", age: "36" },
      { name: "ella", age: "27" },
    ],
  };

  console.log(school.student[0].age);
  const user = { loggedIn: true };
  console.log(!user.loggedIn);

  /*  */
  return (
    <div>
      <h1>HomePage</h1>
      <h1>HomePage</h1>

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
                    value={inputVal[inp.name as keyof inputArrValType] ?? ""}
                    onChange={(e) => handleChange(e)}
                  />
                </label>
              </div>
            );
          })}
        <button onClick={() => handleAddProduct()}> Add Product</button>
      </div>

      {products.length > 0 ? (
        products.map((it, ind) => {
          return (
            <div key={ind}>
              <div>
                <h5>id:{it.id}</h5>
                <h5>name:{it.name}</h5>
                <h5>description:{it.description}</h5>
                <h5>price:{it.price}</h5>
              </div>
              <div>
                <button onClick={() => handleEdit(it.id)}>Edit</button>
                <button onClick={() => handleDelete(it.id)}>Delete</button>
              </div>
            </div>
          );
        })
      ) : (
        <div>
          <h1>there is no Products</h1>
        </div>
      )}
      {isEdit && (
        <SaveSection
          inputSaveVal={inputSaveVal}
          handleSaveChange={handleSaveChange}
          handleSave={handleSave}
        />
      )}
    </div>
  );
}
