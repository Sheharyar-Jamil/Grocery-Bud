import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

const List = (props) => {
  return (
    <div className="grocery-list">
      <article className="grocery-item">
        <p className="ttile">{props.name}</p>
        <div className="btn-container">
          <button className="edit-btn" type="button" onClick={() => props.editItem(props.id)}>
            <FaEdit />
          </button>
          <button
            className="delete-btn"
            type="button"
            onClick={() => props.removeItem(props.id)}
          >
            <FaTrash />
          </button>
        </div>
      </article>
    </div>
  );
};

export default List;
