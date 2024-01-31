import { useState } from "react";
import  Item  from "./Item";

export default function PackingList({items, onDeleteItem, onUpdateItem, onClearList}) {
    const [sortby, setSortby] = useState("input");
    let sortedItems;
    if (sortby === "input") {
      sortedItems = items ;
    }
    if (sortby === "description") {
      sortedItems = items.slice().sort((a,b)=>a.description.localeCompare(b.description));
    }
    if (sortby === "packed") {
      sortedItems = items.slice().sort((a,b)=>(a.packed)-(b.packed));
    }
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item itemObj={item} onDeleteItem={onDeleteItem} onUpdateItem={onUpdateItem} key={item.id} />
          ))}
        </ul>
        <div className="actions">
          <select value={sortby} onChange={(e)=> setSortby(e.target.value)}>
            <option value="input">Sort by Order</option>
            <option value="description">Sort by Description</option>
            <option value="packed">Sort by Status</option>
          </select>
          <button onClick={onClearList}>Clear List</button>
  
        </div>
      </div>
    );
  }
  
