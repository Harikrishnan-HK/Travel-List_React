export default function Item({ itemObj, onDeleteItem, onUpdateItem }) {
    return (
        <li>
            <input type="checkbox" value={itemObj.packed} onChange={() => { onUpdateItem(itemObj.id); }} />
            <span style={itemObj.packed ? { textDecoration: "line-through" } : {}}>
                {itemObj.quantity} {itemObj.description}
            </span>
            <button onClick={() => onDeleteItem(itemObj.id)}>❌</button>
        </li>
    );
}
