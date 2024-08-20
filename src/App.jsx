import { useState,useEffect } from "react";
import "./App.css";
import groceryCartImg from "./assets/grocery-cart.png";

// {
//   name:inputValue,
//   quantity:1,
//   completed:false
// }

function App() {
  const [inputValue, setInputValue] = useState("");
  const [groceryItems, setGroceryItems] = useState([]);
  const [isCompleted,setIsCompleted] = useState(false);


  useEffect(()=>{determineComplatedState()},[groceryItems])

  const determineComplatedState = () => {
    if(!groceryItems.length){
      return setIsCompleted(false);
    }

    let isAllCompleted = true;
    groceryItems.forEach(item => {
      if(!item.completed) isAllCompleted = false
    })
    setIsCompleted(isAllCompleted);
  }

  const handleAddGroceryItem = (e) => {
    if (e.key === "Enter") {
      if (inputValue) {
        const updatedGroceryList = [...groceryItems];
        console.log("1st updatedGroceryList:",updatedGroceryList)
        // findIndex to check if name already exists on the list return 0, return -1 if name is not in the list
        const itemIndex = updatedGroceryList.findIndex(item => item.name === inputValue)
        if (itemIndex === -1){
          updatedGroceryList.push(
            {
              name: inputValue,
              quantity: 1,
              completed: false,
            })
            console.log("itemIndexIf:",itemIndex)
            console.log("2nd updatedGroceryList:",updatedGroceryList)
        }else{
          updatedGroceryList[itemIndex].quantity++
          console.log("itemIndexElse:",itemIndex)
        }
        // without check name before include to the list
        // setGroceryItems([
        //   ...groceryItems,
          // {
          //   name: inputValue,
          //   quantity: 1,
          //   completed: false,
          // },
        // ]);
        console.log("items added");
     
      setGroceryItems(updatedGroceryList);
      setInputValue("");
      
      }
    }
  };

  const handleChangeInputValue = (e) => {
    setInputValue(e.target.value);
    
  };

  const handleRemoveItem = (name) => {
    // const updatedGroceryList = [...groceryItems].filter(item => item.name !== name)
    // setGroceryItems(updatedGroceryList);

    setGroceryItems([...groceryItems].filter(item => item.name !== name));
    
  }

  const handleUpdateCompleteStatus = (status,index) => {
    const updatedGroceryList = [...groceryItems];
    updatedGroceryList[index].completed = status;
    setGroceryItems(updatedGroceryList);

  }

  const renderGroceryList = () => {
    return groceryItems.map((item,index) => (
      <li key={item.name}>
              <div className="container">
                <input type="checkbox" onChange={(e) => handleUpdateCompleteStatus(e.target.checked,index)}/>
                <p>{item.name}{item.quantity > 1 && <span>x{item.quantity}</span>}</p>
              </div>
              <div className="remove-button" onClick={() => handleRemoveItem(item.name)}>X</div>
            </li>
    ));
  }

  return (
    <>
      <main className="App">
        <div>
          <div>
            <h4 className="success">{isCompleted && "You're Done"}</h4>
            <div className="header">
              <h1>Shopping List</h1>
              {/* {JSON.stringify(groceryItems)} */}
              <img src={groceryCartImg} alt="" />
              <input
                type="text"
                placeholder="Add an item..."
                className="item-input"
                value={inputValue}
                onChange={handleChangeInputValue}
                onKeyDown={handleAddGroceryItem}
              />
            </div>
          </div>
          <ul>
            {renderGroceryList()}
          </ul>
        </div>
      </main>
    </>
  );
}

export default App;
