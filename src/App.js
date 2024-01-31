import { useState } from "react";


export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems (item) {
    setItems((items)=> [...items, item] )
  }
  function handleDeleteItem (id) {
    setItems((items)=> items.filter(item => item.id !== id))
  }
  function handleToggleItem (id) {
    setItems((items)=> items.map(item => item.id === id ? {...item, packed: !item.packed} : item))
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} onDeleteItem={handleDeleteItem} onUpdateItem={handleToggleItem}/>
      <Stats items={items}/>
    </div>
  );
}

function Logo() {
  return <h1>🏖️ Far Away 🧳</h1>;
}

function Form({onAddItems}) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  
  function handleSubmit(e) {
    e.preventDefault();

    if(!description) return;
      const newItem = {description, quantity, packed:false, id: Date.now()};
      console.log(newItem);

      onAddItems(newItem);

      setDescription("");
      setQuantity(1);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 😍</h3>
      <select
        value={quantity}
        onChange={(e) => {
          setQuantity(e.target.value);
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}

function PackingList({items, onDeleteItem, onUpdateItem}) {
  const [sortby, setSortby] = useState("input");
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item itemObj={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} key={item.id} />
        ))}
      </ul>
      <div className="actions">
        <select value={sortby} onChange={(e)=> setSortby(e.target.value)}>
          <option value="input">Sort by Order</option>
          <option value="description">Sort by Description</option>
          <option value="packed">Sort by Status</option>

        </select>

      </div>
    </div>
  );
}

function Item({ itemObj, onDeleteItem, onUpdateItem }) {
  return (
    <li>
      <input type="checkbox" value={itemObj.packed} onChange={()=>{onUpdateItem(itemObj.id)}} />
      <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
        {itemObj.quantity} {itemObj.description}
      </span>
      <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
    </li>
  );
}

function Stats({items}) {
  if(!items.length) {
    return (
      <p className="stats">
        <em>
          Start adding items to your packing list
        </em>
      </p> 
      )
  }
   else {


  const numItems =items.length;
  const numPacked = items.filter((item)=>item.packed).length;
  const percentPacked = Math.round((numPacked/numItems)*100);
  

  return (
    <footer className="stats">
      <em>
      {percentPacked === 100 ? 'You got everything! Ready to GO 🛫' :  
      `💼 You have ${numItems} items on your list and you already packed ${numPacked} (${percentPacked}%)`}
      </em>
    </footer>
  );
}
}
